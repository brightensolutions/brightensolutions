"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Our experience with the website development team has been outstanding. They understood our vision perfectly and transformed it into a modern, fast, and user-friendly website that truly represents the spirit of Daga Group. The attention to detail, creativity, and technical expertise exceeded our expectations. We’ve already started receiving great feedback from our clients!",
      name: "Daga Groups",
      designation: "https://dagagroups.com/",
      src: "/testimonials/daga-groups.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Maruti Furnishing",
      designation: "https://www.marutifurnishings.com/",
      src: "/testimonials/maruti-furnisning.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/gallery/team-celebration.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/gallery/team-celebration.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/gallery/team-celebration.jpg",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-10">
      

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid md:grid-cols-1 gap-7 items-center">
          <div className="mb-16 text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-2 inline-block rounded-full bg-brightencolor-brightenone/10 px-4 py-1 text-sm font-medium text-brightencolor-brightenone"
            >
              Testimonials
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-6 text-4xl font-bold font-inter leading-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              What our clients have said <br className="hidden md:block" />
              <span className="text-brightencolor-brightenone">
                about our work
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto font-roboto-slab max-w-3xl text-lg text-gray-600"
            >
              Don't just take our word for it. Here's what our clients have to
              say about their experience working with Brighten Solutions.
            </motion.p>
          </div>

          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
