import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real app, this would send to an API
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-green-400 font-medium p-2 bg-green-400/10 rounded-lg border border-green-400/20"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span>Thanks! We'll keep you updated.</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-background/50 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary h-12"
      />
      <Button type="submit" size="icon" className="h-12 w-12 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
        <ArrowRight className="w-5 h-5" />
      </Button>
    </form>
  );
}
