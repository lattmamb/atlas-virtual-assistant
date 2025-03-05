
"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
  description?: string;
  onClick?: () => void;
}

export const HeroParallax = ({
  products,
}: {
  products: Product[];
}) => {
  // Simplified component with no background effects
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 6);
  const thirdRow = products.slice(6, 9);
  
  return (
    <div className="py-40 relative flex flex-col self-auto">
      <Header />
      <div className="">
        <div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
        <div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
        <div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Welcome to <br /> Atlas Universe
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Explore our suite of applications designed to enhance your digital experience.
        Discover vision, creativity, and intelligence across our interconnected platforms.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: Product;
  translate?: MotionValue<number>;
}) => {
  return (
    <div
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <div
        onClick={product.onClick}
        className="block group-hover/product:shadow-2xl cursor-pointer"
      >
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-xl"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        <h2 className="text-xl font-bold">{product.title}</h2>
        {product.description && (
          <p className="text-sm mt-2 text-white/70">{product.description}</p>
        )}
      </div>
    </div>
  );
};
