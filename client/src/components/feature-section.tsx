import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  align?: "left" | "right";
  badge?: string;
}

export function FeatureSection({ 
  title, 
  subtitle, 
  description, 
  image, 
  color, 
  align = "left",
  badge
}: FeatureSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div 
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none",
          align === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        )}
        style={{ backgroundColor: color }}
      />

      <div className="container px-4 md:px-6 mx-auto">
        <div className={cn(
          "grid gap-12 lg:grid-cols-2 items-center",
          align === "right" && "lg:grid-flow-dense" // Fixes column ordering when reversed
        )}>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: align === "left" ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={cn(
              "space-y-6",
              align === "right" && "lg:col-start-2"
            )}
          >
            {badge && (
              <span 
                className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/5 border border-white/10"
                style={{ color: color }}
              >
                {badge}
              </span>
            )}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                <span style={{ color: color }}>{title}</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium">{subtitle}</p>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-[600px]">
              {description}
            </p>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={cn(
              "relative mx-auto lg:mx-0 w-full max-w-[400px] lg:max-w-none perspective-1000",
              align === "right" && "lg:col-start-1"
            )}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-white/5 shadow-2xl bg-black">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-auto object-cover"
              />
              
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div 
              className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl -z-10 rounded-full opacity-50"
              style={{ background: `radial-gradient(circle, ${color}33 0%, transparent 70%)` }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
