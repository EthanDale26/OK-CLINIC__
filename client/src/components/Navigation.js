import { Home, Calendar, LogOut, FileText, MessageSquare } from 'lucide-react';

// --- Inline Button Component ---
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

// -- Navigation Component --
export function Navigation({ currentPage, onNavigate, onLogout }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-primary">PawCare Veterinary</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={currentPage === 'profile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('profile')}
            >
              <Home className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              variant={currentPage === 'booking' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('booking')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
            <Button
              variant={currentPage === 'invoices' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('invoices')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Invoices
            </Button>
            <Button
              variant={currentPage === 'feedback' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('feedback')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Feedback
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
