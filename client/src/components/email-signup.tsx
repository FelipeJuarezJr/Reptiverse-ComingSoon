import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 409) {
        setError("This email is already subscribed");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-green-400 font-medium p-3 bg-green-400/10 rounded-lg border border-green-400/20"
      >
        <CheckCircle2 className="w-5 h-5 shrink-0" />
        <span>Thanks! We'll keep you updated.</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
      <div className="flex items-center space-x-2">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          data-testid="input-email"
          className="bg-background/50 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary h-12 disabled:opacity-50"
          required
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={loading}
          data-testid="button-subscribe"
          className="h-12 w-12 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 text-sm p-2 bg-red-400/10 rounded border border-red-400/20"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </form>
  );
}
