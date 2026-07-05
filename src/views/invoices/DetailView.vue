<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink, useRoute } from 'vue-router'
import { useInvoicesStore } from '@/stores/invoice'
import { Loader, Pencil, ArrowLeft, FileText } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ukFormat } from '@/utils/dateFormat'
import { getStatus } from '@/utils/status'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const invoiceStore = useInvoicesStore()
const invoiceId = route.params.id as string

const invoice = ref<{
  id: number | string
  invoiceNumber: string
  clientId: string
  amount: number
  description: string
  status: string
  dueDate: string
  paidAt: string | null
  created_at: string
  updated_at: string
} | null>(null)

const loading = ref(true)
const pdfLoading = ref(false)

async function exportPDF() {
  if (!invoice.value) return

  pdfLoading.value = true
  const doc = new jsPDF()

  const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>`

  await new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 26
      canvas.height = 23
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, 26, 23)
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 180, 10, 26, 23)
      resolve()
    }
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgLogo)))}`
  })

  doc.setFontSize(18)
  doc.text(`Invoice ${invoice.value.invoiceNumber}`, 14, 22)

  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, 14, 30)

  autoTable(doc, {
    startY: 38,
    head: [['Field', 'Value']],
    body: [
      ['Invoice Number', invoice.value.invoiceNumber],
      ['Client ID', invoice.value.clientId],
      ['Amount', `£${invoice.value.amount}`],
      ['Description', invoice.value.description],
      ['Status', invoice.value.status.replace('_', ' ')],
      ['Due Date', invoice.value.dueDate],
      ['Paid At', invoice.value.paidAt ? ukFormat(invoice.value.paidAt, true) : 'Not paid'],
      ['Created At', ukFormat(invoice.value.created_at, true)],
      ['Updated At', ukFormat(invoice.value.updated_at, true)],
    ],
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 10 },
  })

  doc.save(`invoice-${invoice.value.invoiceNumber}.pdf`)
  pdfLoading.value = false
}

onMounted(async () => {
  const result = await invoiceStore.fetchInvoice(invoiceId)
  invoice.value = result ?? null
  loading.value = false
})
</script>

<template>
  <div>
    <PageTitle title="Invoice Details" subtitle="View and manage invoice information.">
      <RouterLink to="/dashboard/invoices">
        <Button class="button-primary-outline">All Invoices</Button>
      </RouterLink>
    </PageTitle>

    <div v-if="loading" class="flex justify-center mt-20">
      <Loader class="size-8 animate-spin text-muted-foreground" />
    </div>

    <Card v-else-if="invoice" class="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <CardTitle class="text-[22px] font-semibold leading-[normal] text-foreground">
              Invoice {{ invoice.invoiceNumber }}
            </CardTitle>
            <CardDescription class="mt-1">Client: {{ invoice.clientId }}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex">
          <div class="flex-1 min-w-0 space-y-4 text-sm text-muted-foreground">
            <div><strong>Amount:</strong> £{{ invoice.amount }}</div>
            <div><strong>Description:</strong> {{ invoice.description }}</div>
            <div><strong>Due Date:</strong> {{ invoice.dueDate }}</div>
            <div><strong>Paid At:</strong> {{ invoice.paidAt ?? 'Not paid' }}</div>
          </div>
          <div class="ml-6 flex-shrink-0 w-40 space-y-4">
            <span v-html="getStatus(invoice.status)"></span>
            <div class="border-t pt-4 mt-4">
              <dt class="text-sm font-medium text-muted-foreground">Created at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(invoice.created_at)"></dd>
            </div>

            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Updated at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(invoice.updated_at)"></dd>
            </div>

            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Invoice ID</dt>
              <dd class="mt-1 text-sm font-mono">{{ invoice.id }}</dd>
            </div>
          </div>
        </div>
        <dl class="space-y-4">
          <div class="flex items-center gap-3 pt-4">
            <RouterLink :to="`/dashboard/invoice/edit/${invoice.id}`">
              <Button class="button-primary" size="sm">
                <Pencil class="size-4 mr-1" />
                Edit
              </Button>
            </RouterLink>
            <Button
              class="button-primary-outline"
              size="sm"
              :disabled="pdfLoading"
              @click="exportPDF"
            >
              <FileText class="size-4 mr-1" />
              Export PDF
            </Button>
            <RouterLink to="/dashboard/invoices">
              <Button class="button-primary-outline" size="sm">
                <ArrowLeft class="size-4 mr-1" />
                Back
              </Button>
            </RouterLink>
          </div>
        </dl>
      </CardContent>
    </Card>

    <Card v-else class="w-full max-w-md mx-auto mt-10">
      <CardContent class="py-10 text-center text-muted-foreground">
        Invoice not found.
      </CardContent>
    </Card>
  </div>
</template>
