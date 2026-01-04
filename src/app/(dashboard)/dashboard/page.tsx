// src/app/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectsManagement } from "@/components/project-management";
import {
  Shield,
  LogOut,
  BarChart3,
  Mail,
  Menu,
  X,
  ChevronLeft,
  AlertTriangle,
  Clock,
  Users,
  Activity,
  Settings,
  Eye,
  TrendingUp,
  Calendar,
  Globe,
  Search,
  Filter,
  Phone,
  Building,
  User,
  ExternalLink,
  RefreshCw,
  MessageSquare,
  Trash2,
  FolderOpen,
} from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

type AuthStatus = "checking" | "authenticated" | "unauthorized";
type ActiveView = "dashboard" | "messages" | "projects";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  contactMethod: "email" | "phone" | "both";
  timestamp: any;
}

export default function Dashboard() {
  const router = useRouter();

  // Authentication State
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [redirectCountdown, setRedirectCountdown] = useState(10);
  const [loginTime, setLoginTime] = useState<string>("");

  // UI State
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dashboard Data
  const [dashboardData, setDashboardData] = useState({
    totalContacts: 0,
    loginLogs: 0,
    todayMessages: 0,
  });
  const [dashboardLoading, setDashboardLoading] = useState(true);

  // Messages Data
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>(
    []
  );
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [filterMethod, setFilterMethod] = useState<string>("all");

  // Navigation items
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      active: activeView === "dashboard",
    },
    {
      id: "messages",
      label: "Contact Messages",
      icon: Mail,
      active: activeView === "messages",
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
      active: activeView === "projects",
    },
  ];

  // Authentication check
  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = localStorage.getItem("admin_authenticated");
      const loginTimeStamp = localStorage.getItem("admin_login_time");
      const sessionId = localStorage.getItem("admin_session_id");

      if (isAuthenticated === "true" && loginTimeStamp && sessionId) {
        const loginTime = new Date(loginTimeStamp);
        const now = new Date();
        const hoursDifference =
          (now.getTime() - loginTime.getTime()) / (1000 * 3600);

        if (hoursDifference < 24) {
          setAuthStatus("authenticated");
          setLoginTime(loginTime.toLocaleString());
          loadDashboardData();
          loadMessages();
        } else {
          localStorage.removeItem("admin_authenticated");
          localStorage.removeItem("admin_login_time");
          localStorage.removeItem("admin_session_id");
          localStorage.removeItem("admin_user_id");
          setAuthStatus("unauthorized");
        }
      } else {
        setAuthStatus("unauthorized");
      }
    };

    checkAuthentication();
  }, []);

  // Redirect countdown for unauthorized access
  useEffect(() => {
    if (authStatus === "unauthorized") {
      const countdown = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [authStatus, router]);

  // Filter messages when search/filter changes
  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, filterMethod]);

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setDashboardLoading(true);

      // Get contacts count
      const contactsSnapshot = await getDocs(collection(db, "contacts"));
      const totalContacts = contactsSnapshot.size;

      // Get today's messages
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayQuery = query(
        collection(db, "contacts"),
        where("timestamp", ">=", today)
      );
      const todaySnapshot = await getDocs(todayQuery);
      const todayMessages = todaySnapshot.size;

      // Get login logs count
      const logsSnapshot = await getDocs(collection(db, "admin-login-logs"));
      const loginLogs = logsSnapshot.size;

      setDashboardData({
        totalContacts,
        loginLogs,
        todayMessages,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setDashboardLoading(false);
    }
  };

  // Load messages
  const loadMessages = async () => {
    try {
      setMessagesLoading(true);
      const q = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const loadedMessages: ContactMessage[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as ContactMessage)
      );

      setMessages(loadedMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  // Filter messages
  const filterMessages = () => {
    let filtered = messages;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Contact method filter
    if (filterMethod !== "all") {
      filtered = filtered.filter(
        (message) => message.contactMethod === filterMethod
      );
    }

    setFilteredMessages(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_login_time");
    localStorage.removeItem("admin_session_id");
    localStorage.removeItem("admin_user_id");

    toast.success("Logged out successfully");
    router.push("/secret-login");
  };

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId as ActiveView);
    setMobileMenuOpen(false);
    if (viewId === "messages" && messages.length === 0) {
      loadMessages();
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await deleteDoc(doc(db, "contacts", messageId));
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      setSelectedMessage(null);
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const getContactMethodColor = (method: string) => {
    switch (method) {
      case "email":
        return "bg-blue-100 text-blue-800";
      case "phone":
        return "bg-green-100 text-green-800";
      case "both":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Unauthorized access screen
  if (authStatus === "unauthorized") {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-md bg-background/80 z-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-md"
            >
              <div className="bg-card/90 backdrop-blur-sm border-border/50 shadow-2xl rounded-lg p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </motion.div>

                <h1 className="text-2xl font-bold text-foreground mb-3">
                  Access Denied
                </h1>
                <p className="text-muted-foreground mb-6">
                  You don't have permission to access this dashboard.
                </p>

                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      Redirecting in {redirectCountdown}s
                    </span>
                  </div>
                  <motion.div
                    className="w-full bg-muted rounded-full h-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: "100%" }}
                      animate={{ width: `${(redirectCountdown / 10) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="flex-1"
                  >
                    Go Home
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Loading screen
  if (authStatus === "checking") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Dashboard stats cards
  const dashboardCards = [
    {
      title: "Total Contacts",
      value: dashboardData.totalContacts.toString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      trend: "+12%",
    },
    {
      title: "Today's Messages",
      value: dashboardData.todayMessages.toString(),
      icon: Mail,
      color: "text-green-600",
      bg: "bg-green-500/10",
      trend: "+5%",
    },
    {
      title: "Login Attempts",
      value: dashboardData.loginLogs.toString(),
      icon: Activity,
      color: "text-orange-600",
      bg: "bg-orange-500/10",
      trend: "+2%",
    },
    {
      title: "System Status",
      value: "Online",
      icon: Globe,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      trend: "100%",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? "80px" : "280px",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="bg-card border-r border-border flex-shrink-0 relative z-30"
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h1 className="font-semibold text-foreground">5fox</h1>
                      <p className="text-xs text-muted-foreground">
                        Admin Panel
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="flex-shrink-0"
              >
                <ChevronLeft
                  className={`w-4 h-4 transition-transform ${
                    sidebarCollapsed ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className={`w-full justify-start gap-3 text-muted-foreground hover:text-foreground ${
                sidebarCollapsed ? "px-2" : ""
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {navItems.find((item) => item.active)?.label || "Dashboard"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Welcome back, Administrator • Last login: {loginTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">Super User</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeView === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Dashboard Content */}
                {dashboardLoading ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-32 bg-muted rounded-lg animate-pulse"
                        />
                      ))}
                    </div>
                    <div className="h-64 bg-muted rounded-lg animate-pulse" />
                  </div>
                ) : (
                  <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {dashboardCards.map((card, index) => (
                        <motion.div
                          key={card.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <p className="text-sm text-muted-foreground">
                                    {card.title}
                                  </p>
                                  <p className="text-2xl font-bold text-foreground">
                                    {card.value}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs text-green-600">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>{card.trend}</span>
                                  </div>
                                </div>
                                <div
                                  className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center`}
                                >
                                  <card.icon
                                    className={`w-6 h-6 ${card.color}`}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeView === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Messages Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      Contact Messages
                    </h1>
                    <p className="text-muted-foreground">
                      {filteredMessages.length} of {messages.length} messages
                    </p>
                  </div>

                  <Button onClick={loadMessages} disabled={messagesLoading}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                {messagesLoading ? (
                  <div className="space-y-4">
                    <div className="h-20 bg-muted rounded-lg animate-pulse" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-32 bg-muted rounded-lg animate-pulse"
                          />
                        ))}
                      </div>
                      <div className="h-96 bg-muted rounded-lg animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Filters */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {["all", "email", "phone", "both"].map((method) => (
                              <Button
                                key={method}
                                variant={
                                  filterMethod === method
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setFilterMethod(method)}
                              >
                                <Filter className="w-4 h-4 mr-1" />
                                {method === "all"
                                  ? "All"
                                  : method.charAt(0).toUpperCase() +
                                    method.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Messages Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Messages List */}
                      <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                          {filteredMessages.length > 0 ? (
                            filteredMessages.map((message, index) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Card
                                  className={`bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer ${
                                    selectedMessage?.id === message.id
                                      ? "ring-2 ring-primary"
                                      : ""
                                  }`}
                                  onClick={() => setSelectedMessage(message)}
                                >
                                  <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                          <User className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                          <h3 className="font-semibold text-foreground">
                                            {message.name}
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                            {message.email}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <Badge
                                          className={getContactMethodColor(
                                            message.contactMethod
                                          )}
                                        >
                                          {message.contactMethod}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                          {message.timestamp
                                            ?.toDate?.()
                                            ?.toLocaleDateString?.() ||
                                            "Recent"}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <h4 className="font-medium text-foreground">
                                        {message.subject}
                                      </h4>
                                      <p className="text-sm text-muted-foreground line-clamp-2">
                                        {message.message}
                                      </p>

                                      {(message.phone || message.company) && (
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                                          {message.phone && (
                                            <div className="flex items-center gap-1">
                                              <Phone className="w-3 h-3" />
                                              {message.phone}
                                            </div>
                                          )}
                                          {message.company && (
                                            <div className="flex items-center gap-1">
                                              <Building className="w-3 h-3" />
                                              {message.company}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center py-12"
                            >
                              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                No messages found
                              </h3>
                              <p className="text-muted-foreground">
                                {searchTerm || filterMethod !== "all"
                                  ? "Try adjusting your search or filter criteria."
                                  : "No contact messages have been received yet."}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Message Detail */}
                      <div className="lg:col-span-1">
                        <AnimatePresence mode="wait">
                          {selectedMessage ? (
                            <motion.div
                              key={selectedMessage.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-6">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-primary" />
                                    Message Details
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        From
                                      </label>
                                      <p className="font-semibold text-foreground">
                                        {selectedMessage.name}
                                      </p>
                                    </div>

                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Email
                                      </label>
                                      <p className="text-foreground">
                                        {selectedMessage.email}
                                      </p>
                                    </div>

                                    {selectedMessage.phone && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                          Phone
                                        </label>
                                        <p className="text-foreground">
                                          {selectedMessage.phone}
                                        </p>
                                      </div>
                                    )}

                                    {selectedMessage.company && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                          Company
                                        </label>
                                        <p className="text-foreground">
                                          {selectedMessage.company}
                                        </p>
                                      </div>
                                    )}

                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Subject
                                      </label>
                                      <p className="font-medium text-foreground">
                                        {selectedMessage.subject}
                                      </p>
                                    </div>

                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Message
                                      </label>
                                      <div className="mt-1 p-3 bg-muted/30 rounded-lg">
                                        <p className="text-foreground whitespace-pre-wrap">
                                          {selectedMessage.message}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Received
                                      </label>
                                      <p className="text-foreground flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {selectedMessage.timestamp
                                          ?.toDate?.()
                                          ?.toLocaleString?.() || "Unknown"}
                                      </p>
                                    </div>

                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Preferred Contact
                                      </label>
                                      <Badge
                                        className={getContactMethodColor(
                                          selectedMessage.contactMethod
                                        )}
                                      >
                                        {selectedMessage.contactMethod}
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="flex gap-2 pt-4 border-t border-border">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex-1"
                                      onClick={() =>
                                        window.open(
                                          `mailto:${selectedMessage.email}`,
                                          "_blank"
                                        )
                                      }
                                    >
                                      <ExternalLink className="w-4 h-4 mr-1" />
                                      Reply
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        deleteMessage(selectedMessage.id)
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center py-12"
                            >
                              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                                <CardContent className="p-8">
                                  <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                  <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Select a Message
                                  </h3>
                                  <p className="text-muted-foreground">
                                    Choose a message from the list to view its
                                    details here.
                                  </p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeView === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectsManagement />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Session Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              {activeView === "dashboard"
                ? `Dashboard last updated: ${new Date().toLocaleTimeString()}`
                : `Showing ${filteredMessages.length} messages`}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-280 bg-card border-r border-border z-50 md:hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h1 className="font-semibold text-foreground">5fox</h1>
                      <p className="text-xs text-muted-foreground">
                        Admin Panel
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${
                        item.active
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
