"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

interface ShowcaseCardProps {
  name: string;
  image: string;
  href: string;
  blurb: string;
  index?: number;
}

export function ShowcaseCard({ name, image, href, blurb, index = 0 }: ShowcaseCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-md border border-surface-high bg-surface"
    >
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={`${name} category`}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end p-5">
          <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-3xl">
            {name}
          </h3>
          <p className="mt-1 text-center text-xs uppercase tracking-wider text-muted">
            {blurb}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
