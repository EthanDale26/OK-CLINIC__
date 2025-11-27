import { useState } from 'react';
import { FileText, Download, CreditCard, Calendar, DollarSign } from 'lucide-react';

// ---- UI COMPONENTS ----

function Card({ children, className = '', ...props }) {
  return <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props}>{children}</div>;
}
function CardHeader({ children, className = '', ...props }) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>{children}</div>;
}
function CardTitle({ children, className = '' }) {
  return <h2 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h2>;
}
function CardDescription({ children, className = '' }) {
  return <p className={`text-muted-foreground text-sm ${className}`}>{children}</p>;
}
function CardContent({ children, className = '', ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
}
function Button({ children, variant = "default", size = "default", className = '', ...props }) {
  let base = "inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  let variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm",
    ghost: "hover:bg-accent hover:text-accent-foreground px-2 py-1 text-sm"
  };
  let sizes = {
    default: "",
    sm: "h-8 px-2 text-xs",
  };
  return (
    <button className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}
function Badge({ children, className = '', variant = 'default', ...props }) {
  let variants = {
    default: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground",
    outline: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-border",
  };
  return <span className={`${variants[variant] || ""} ${className}`} {...props}>{children}</span>;
}
function Table({ children, ...props }) {
  return <table className="w-full text-sm border-collapse" {...props}>{children}</table>;
}
function TableHead({ children }) { return <th className="px-4 py-2 text-left font-semibold">{children}</th>; }
function TableHeader({ children }) { return <thead className="bg-muted">{children}</thead>; }
function TableRow({ children }) { return <tr className="border-b">{children}</tr>; }
function TableCell({ children, colSpan, className = '' }) {
  return <td className={`px-4 py-2 align-top ${className}`} colSpan={colSpan}>{children}</td>;
}
function TableBody({ children }) { return <tbody>{children}</tbody>; }
// Dialog (skeleton version)
function Dialog({ children }) { return <>{children}</>; }
function DialogTrigger({ children, asChild = false }) { return asChild ? children : <button>{children}</button>; }
function DialogContent({ children, className = '', ...props }) { return <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 border bg-popover rounded-lg shadow-lg w-full max-w-lg p-6 ${className}`} {...props}>{children}</div>; }
function DialogHeader({ children }) { return <div className="mb-4">{children}</div>; }
function DialogTitle({ children }) { return <h3 className="text-lg font-bold mb-1">{children}</h3>; }
function DialogDescription({ children }) { return <div className="text-muted-foreground mb-2">{children}</div>; }
// Tabs
function Tabs({ children, value, onValueChange, className = '' }) {
  return <div className={className}>{children}</div>;
}
function TabsList({ children, className }) {
  return <div className={`inline-flex border rounded mb-2 ${className}`}>{children}</div>;
}
function TabsTrigger({ children, value, onClick = undefined }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer`}
    >
      {children}
    </button>
  );
}
function TabsContent({ children }) { return <div>{children}</div>; }
// Input
function Input({ ...props }) {
  return <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring" {...props} />;
}
function Label({ children }) {
  return <label className="text-sm font-medium leading-none block mb-1">{children}</label>;
}
function Select({ children }) { return <div>{children}</div>; }
function SelectContent({ children }) { return <div className="bg-popover border rounded">{children}</div>; }
function SelectItem({ children, ...props }) { return <div className="px-4 py-2 cursor-pointer" {...props}>{children}</div>; }
function SelectTrigger({ children, ...props }) { return <button {...props}>{children}</button>; }
function SelectValue({ children }) { return <span>{children}</span>; }

// ---- END UI COMPONENTS ----

export function InvoicesPage({ user, onNavigate }) {
  // Mock invoice data
  const [invoices] = useState([
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      date: '2025-01-15',
      dueDate: '2025-02-15',
      services: ['Annual Checkup', 'Vaccination'],
      petName: 'Buddy',
      amount: 150.00,
      status: 'paid',
      paymentMethod: 'Credit Card',
      paidDate: '2025-01-15'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      date: '2025-02-20',
      dueDate: '2025-03-20',
      services: ['Dental Cleaning'],
      petName: 'Whiskers',
      amount: 200.00,
      status: 'pending',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-089',
      date: '2024-11-01',
      dueDate: '2024-12-01',
      services: ['Emergency Visit', 'X-Ray'],
      petName: 'Buddy',
      amount: 450.00,
      status: 'overdue',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2025-003',
      date: '2025-03-05',
      dueDate: '2025-04-05',
      services: ['Grooming', 'Nail Trim'],
      petName: 'Whiskers',
      amount: 75.00,
      status: 'paid',
      paymentMethod: 'Debit Card',
      paidDate: '2025-03-05'
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInvoices = invoices.filter(inv =>
    filterStatus === 'all' ? true : inv.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'overdue':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return '';
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = filteredInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = filteredInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  const handlePayInvoice = (invoice) => {
    alert(`Payment processing for ${invoice.invoiceNumber} - $${invoice.amount}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-primary mb-2">Invoices</h1>
          <p className="text-muted-foreground">
            Track and manage your veterinary invoices
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalAmount.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.length} invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Paid</span>
                <DollarSign className="w-4 h-4 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalPaid.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.filter(inv => inv.status === 'paid').length} invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Pending</span>
                <Calendar className="w-4 h-4 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalPending.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.filter(inv => inv.status === 'pending').length} invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-muted-foreground">Overdue</span>
                <CreditCard className="w-4 h-4 text-red-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary">${totalOverdue.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1">{filteredInvoices.filter(inv => inv.status === 'overdue').length} invoices</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and manage your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={filterStatus}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" onClick={() => setFilterStatus('all')}>All</TabsTrigger>
                <TabsTrigger value="paid" onClick={() => setFilterStatus('paid')}>Paid</TabsTrigger>
                <TabsTrigger value="pending" onClick={() => setFilterStatus('pending')}>Pending</TabsTrigger>
                <TabsTrigger value="overdue" onClick={() => setFilterStatus('overdue')}>Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Pet</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No invoices found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.invoiceNumber}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell>{invoice.petName}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            {invoice.services.join(', ')}
                          </div>
                        </TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedInvoice(invoice)}
                                >
                                  <FileText className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              {selectedInvoice?.id === invoice.id && (
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Invoice Details</DialogTitle>
                                    <DialogDescription>
                                      Invoice {invoice.invoiceNumber}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Invoice Number</Label>
                                        <p className="mt-1">{invoice.invoiceNumber}</p>
                                      </div>
                                      <div>
                                        <Label>Status</Label>
                                        <div className="mt-1">
                                          <Badge className={getStatusColor(invoice.status)}>
                                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Date Issued</Label>
                                        <p className="mt-1">{new Date(invoice.date).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <Label>Due Date</Label>
                                        <p className="mt-1">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <Label>Pet</Label>
                                        <p className="mt-1">{invoice.petName}</p>
                                      </div>
                                      {invoice.paidDate && (
                                        <div>
                                          <Label>Paid Date</Label>
                                          <p className="mt-1">{new Date(invoice.paidDate).toLocaleDateString()}</p>
                                        </div>
                                      )}
                                      {invoice.paymentMethod && (
                                        <div>
                                          <Label>Payment Method</Label>
                                          <p className="mt-1">{invoice.paymentMethod}</p>
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Services</Label>
                                      <div className="mt-2 space-y-2">
                                        {invoice.services.map((service, idx) => (
                                          <div key={idx} className="flex justify-between p-2 bg-muted rounded">
                                            <span>{service}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="border-t pt-4">
                                      <div className="flex justify-between">
                                        <span>Total Amount</span>
                                        <span>${invoice.amount.toFixed(2)}</span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                      <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                      </Button>
                                      {invoice.status !== 'paid' && (
                                        <Button onClick={() => handlePayInvoice(invoice)}>
                                          <CreditCard className="w-4 h-4 mr-2" />
                                          Pay Now
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </DialogContent>
                              )}
                            </Dialog>
                            {invoice.status !== 'paid' && (
                              <Button
                                size="sm"
                                onClick={() => handlePayInvoice(invoice)}
                              >
                                Pay
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
