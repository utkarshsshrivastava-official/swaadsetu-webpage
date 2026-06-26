/**
 * Blogs.tsx — SwaadSetu Blog Listing Page
 *
 * Layout: page.tsx reference structure (cover images, dynamic categories,
 *         4-col grid, newsletter strip, loading state)
 * Theme:  SwaadSetu dark editorial (bg-base-100, amber accents, framer-motion)
 */

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../component/Navbar";
import { Footer } from "../component/Footer";
import BackButton from "../component/ui/BackButton";
import { Helmet } from "@dr.pogodin/react-helmet";
import { CTASection } from "../component/cta-section";
import {Images} from '../assets/assets';

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─────────────────────────────────────────────
   Floating particle
───────────────────────────────────────────── */
const Particle = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-amber-400 pointer-events-none"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ y: [0, -18, 0], opacity: [0.1, 0.4, 0.1] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const particles = [
  { x: "5%",  y: "20%", size: 3, delay: 0.2 },
  { x: "85%", y: "30%", size: 5, delay: 0.8 },
  { x: "50%", y: "10%", size: 4, delay: 0.5 },
  { x: "92%", y: "65%", size: 3, delay: 2.1 },
];

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
type BlogCategory = "All" | "Product"  | "Updates" | "Operations" | "Growth" ;
type AccentCategory = BlogPost["category"] | "Article";
type Accent = {
  bg: string;
  text: string;
  border: string;
};

export interface BlogBullet {
  title: string;
  description: string;
}


export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: BlogBullet[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: "Product" | "Operations" | "Growth" | "Updates";
  readTime: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
  sections: BlogSection[];
}

const BLOG_POSTS: BlogPost[] = [
  //Product
{
  id: 1,
  slug: "qr-menu-vs-traditional-menu",
  title: "QR Menu vs Traditional Menu: Which Is Better for Restaurants?",
  category: "Product",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.product_1,

  excerpt:
    "Restaurant technology is evolving rapidly, and one of the biggest changes in recent years is the shift from traditional printed menus to QR menus. Learn why more restaurants are adopting digital menus.",

  sections: [
    {
      paragraphs: [
        "Restaurant technology is evolving rapidly, and one of the biggest changes in recent years is the shift from traditional printed menus to QR menus. Many restaurants, cafés, and QSRs are adopting digital menus to improve efficiency and enhance customer experiences."
      ]
    },

    {
      heading: "Traditional Menus: Familiar but Limited",
      paragraphs: [
        "Printed menus are easy to use and familiar to guests. However, updating prices, adding new dishes, or removing unavailable items often requires reprinting, leading to additional costs and operational delays."
      ]
    },

    {
      heading: "QR Menus: Built for Modern Dining",
      paragraphs: [
        "A QR menu allows customers to access the menu instantly by scanning a code with their smartphone. Guests can browse dishes, view images, and place orders without waiting for staff assistance."
      ]
    },

    {
      heading: "Key Differences",
      bullets: [
        {
          title: "Faster Ordering",
          description:
            "Customers can start browsing the menu immediately after being seated, reducing wait times and improving table turnover."
        },
        {
          title: "Real-Time Updates",
          description:
            "Restaurants can update menu items, pricing, and availability instantly without printing new menus."
        },
        {
          title: "Better Order Accuracy",
          description:
            "Digital ordering helps reduce communication errors by allowing guests to submit their preferences directly."
        },
        {
          title: "Improved Operational Efficiency",
          description:
            "QR-based ordering streamlines workflows and enables staff to focus more on service and hospitality."
        }
      ]
    },

    {
      heading: "Which Option Is Better?",
      paragraphs: [
        "While traditional menus still work for some businesses, QR menus offer greater flexibility, faster service, and easier menu management. For restaurants looking to modernize operations and deliver a smoother guest experience, QR menus are becoming the preferred choice."
      ]
    }
  ]
},

{
  id: 2,
  slug: "real-time-order-tracking-improves-customer-experience",
  title: "How Real-Time Order Tracking Improves Customer Experience",
  category: "Product",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.product_3,

  excerpt:
    "Customer expectations have changed significantly in recent years. Real-time order tracking keeps guests informed, improves transparency, and creates a smoother dining experience.",

  sections: [
    {
      paragraphs: [
        "Customer expectations have changed significantly in recent years. Guests no longer want to place an order and wait without knowing what is happening behind the scenes. This is why real-time order tracking is becoming an important part of modern restaurant operations."
      ]
    },

    {
      heading: "What Is Real-Time Order Tracking?",
      paragraphs: [
        "A restaurant order tracking system allows customers to view the status of their order from confirmation to preparation and service. Instead of repeatedly asking staff for updates, guests can see progress in real time."
      ]
    },

    {
      heading: "Better Transparency and Trust",
      paragraphs: [
        "One of the biggest advantages of order tracking is transparency. Customers know their order has been received and can track its progress through each stage. This reduces uncertainty and builds trust in the dining experience."
      ]
    },

    {
      heading: "Reduced Wait-Time Anxiety",
      paragraphs: [
        "Waiting often feels longer when there is no information available. Live order updates keep customers informed, making the waiting experience more comfortable and predictable."
      ]
    },

    {
      heading: "Improved Restaurant Operations",
      paragraphs: [
        "Real-time tracking also benefits restaurant teams. Orders move digitally from guests to the kitchen, reducing communication gaps and helping staff coordinate service more efficiently."
      ]
    },

    {
      heading: "A Better Guest Experience",
      paragraphs: [
        "When customers feel informed and in control, satisfaction naturally improves. Real-time order tracking creates a smoother experience, increases confidence in service, and helps restaurants deliver a more modern and professional dining journey."
      ]
    }
  ]
},

{
  id: 3,
  slug: "benefits-of-digital-billing-for-restaurants-and-cafes",
  title: "Benefits of Digital Billing for Restaurants and Cafés",
  category: "Product",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.product_3,

  excerpt:
    "Digital billing simplifies restaurant operations by improving checkout speed, reducing billing errors, and providing valuable business insights for smarter decision-making.",

  sections: [
    {
      paragraphs: [
        "Billing is one of the most important touchpoints in any dining experience. A slow checkout process can create delays, while billing errors can impact customer satisfaction and daily operations.",
        "This is why many restaurants and cafés are moving towards modern digital billing systems."
      ]
    },

    {
      heading: "Faster Checkout Experience",
      paragraphs: [
        "Digital billing software allows restaurants to generate bills instantly, apply taxes automatically, and process payments without manual calculations. This helps reduce waiting times and ensures a smoother experience for guests during peak hours."
      ]
    },

    {
      heading: "Improved Accuracy",
      paragraphs: [
        "Manual billing often increases the chances of pricing mistakes, tax calculation errors, and duplicate entries. A restaurant billing system automates these processes, helping teams maintain consistency and accuracy across every transaction."
      ]
    },

    {
      heading: "Better Business Visibility",
      paragraphs: [
        "Digital billing doesn't just generate invoices—it also provides valuable business insights. Restaurant owners can track sales, monitor popular menu items, review payment trends, and access performance reports from a single dashboard."
      ]
    },

    {
      heading: "Easier Day-to-Day Operations",
      paragraphs: [
        "From discounts and taxes to payment records and order history, everything stays organized in one place. Staff spend less time managing paperwork and more time focusing on customer service."
      ]
    },

    {
      heading: "The Future of Restaurant Billing",
      paragraphs: [
        "As restaurants continue to embrace technology, digital billing software is becoming a standard operational tool. Faster transactions, improved accuracy, and better reporting help food businesses operate more efficiently while delivering a better guest experience.",
        "For modern restaurants and cafés, digital billing is no longer just a convenience—it's a smarter way to run the business."
      ]
    }
  ]
},

{
  id: 4,
  slug: "why-modern-food-businesses-need-an-all-in-one-operating-platform",
  title: "Why Modern Food Businesses Need an All-in-One Operating Platform",
  category: "Product",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.product_5,

  excerpt:
    "Modern food businesses need more than disconnected tools. Discover how an all-in-one operating platform simplifies operations, improves efficiency, and supports long-term business growth.",

  sections: [
    {
      paragraphs: [
        "Running a food business today involves much more than taking orders and serving customers. Restaurants, cafés, cloud kitchens, and QSRs manage menus, billing, payments, inventory, staff coordination, customer engagement, and business reporting every day.",
        "When these processes rely on multiple disconnected tools, operations become harder to manage."
      ]
    },

    {
      heading: "The Challenge of Fragmented Systems",
      paragraphs: [
        "Many food businesses use separate solutions for billing, ordering, inventory tracking, and customer management. While each tool may solve a specific problem, switching between multiple platforms often leads to inefficiencies, duplicated work, and limited visibility.",
        "Teams spend more time managing systems instead of focusing on customers."
      ]
    },

    {
      heading: "One Platform, Better Control",
      paragraphs: [
        "An all-in-one restaurant management software brings core business operations together in a single platform. Orders, payments, inventory, expenses, reports, and customer interactions remain connected, helping teams work more efficiently.",
        "With centralized data, owners can access important business information without juggling multiple dashboards."
      ]
    },

    {
      heading: "Better Decisions Through Real-Time Insights",
      paragraphs: [
        "Modern food business software provides visibility into sales performance, order trends, inventory movement, and operational metrics. These insights help operators identify opportunities, improve efficiency, and make informed business decisions."
      ]
    },

    {
      heading: "Built for Growth",
      paragraphs: [
        "As businesses expand, operational complexity increases. An integrated platform creates a scalable foundation that supports growth without adding unnecessary processes or manual work."
      ]
    },

    {
      heading: "The Future of Food Business Operations",
      paragraphs: [
        "Technology is no longer a competitive advantage—it's becoming a necessity. Food businesses that adopt connected systems can streamline daily operations, improve customer experiences, and gain better control over their growth.",
        "An all-in-one operating platform helps modern food businesses run smarter, faster, and with greater confidence."
      ]
    }
  ]
},

//operations
{
  id: 5,
  slug: "how-to-reduce-wait-times-in-restaurants-without-hiring-more-staff",
  title: "How to Reduce Wait Times in Restaurants Without Hiring More Staff",
  category: "Operations",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.opt_1,

  excerpt:
    "Long wait times don't always require hiring more staff. Learn how modern restaurants reduce delays, improve service speed, and increase customer satisfaction through smarter operational workflows.",

  sections: [
    {
      paragraphs: [
        "Long wait times can frustrate guests, slow table turnover, and impact overall customer satisfaction. While many restaurants assume they need more staff to solve the problem, the real solution is often improving operational efficiency.",
        "Here are a few ways modern restaurants reduce wait times without increasing headcount."
      ]
    },

    {
      heading: "Streamline the Ordering Process",
      paragraphs: [
        "Traditional ordering often requires multiple interactions between guests, waiters, and the kitchen. Digital ordering systems allow customers to browse menus and place orders directly, reducing delays and speeding up service."
      ]
    },

    {
      heading: "Improve Kitchen Coordination",
      paragraphs: [
        "Miscommunication between service staff and the kitchen can slow down order preparation. Real-time order management ensures every order reaches the kitchen instantly and accurately, helping teams stay organized during peak hours."
      ]
    },

    {
      heading: "Provide Live Order Updates",
      paragraphs: [
        "Customers are more patient when they know the status of their order. Real-time order tracking keeps guests informed, reducing repeated status inquiries and allowing staff to focus on service."
      ]
    },

    {
      heading: "Optimize Table Turnover",
      paragraphs: [
        "Faster ordering, billing, and payment processing help tables move more efficiently without making guests feel rushed. Small improvements across the dining journey can significantly reduce overall waiting times."
      ]
    },

    {
      heading: "Focus on Smarter Operations",
      paragraphs: [
        "Reducing wait times isn't always about hiring more people—it's about helping existing teams work more effectively. With the right technology and streamlined workflows, restaurants can serve more guests, improve customer satisfaction, and operate efficiently even during busy hours.",
        "Modern restaurant operations are built on speed, visibility, and coordination—and those improvements often start with better systems, not bigger teams."
      ]
    }
  ]
},


{
  id: 6,
  slug: "common-restaurant-management-mistakes-that-hurt-growth",
  title: "Common Restaurant Management Mistakes That Hurt Growth",
  category: "Operations",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.opt_2,

  excerpt:
    "Operational mistakes can quietly limit restaurant growth. Learn the most common management challenges and discover how modern systems help improve efficiency, consistency, and profitability.",

  sections: [
    {
      paragraphs: [
        "Running a successful restaurant requires more than great food. Many restaurants struggle to grow not because of demand, but because of operational mistakes that gradually affect customer experience, efficiency, and profitability.",
        "Here are some of the most common restaurant management mistakes and how to avoid them."
      ]
    },

    {
      heading: "Ignoring Operational Data",
      paragraphs: [
        "Many restaurant owners rely on assumptions instead of actual performance metrics. Without tracking sales, order trends, and customer preferences, it becomes difficult to identify what is working and what needs improvement."
      ]
    },

    {
      heading: "Poor Inventory Management",
      paragraphs: [
        "Inventory issues can quickly impact profitability. Overstocking increases waste, while stock shortages lead to missed sales opportunities. Maintaining visibility into stock consumption helps businesses control costs and avoid disruptions."
      ]
    },

    {
      heading: "Slow Service During Peak Hours",
      paragraphs: [
        "Long wait times often result from inefficient workflows rather than a lack of staff. Delays in ordering, kitchen communication, or billing can create bottlenecks that affect the entire dining experience."
      ]
    },

    {
      heading: "Inconsistent Customer Experience",
      paragraphs: [
        "Customers expect the same quality of service every time they visit. Poor communication, order errors, and inconsistent processes can reduce customer satisfaction and limit repeat business."
      ]
    },

    {
      heading: "Relying on Manual Processes",
      paragraphs: [
        "Paper-based systems and disconnected tools can slow operations and increase the chances of mistakes. Modern restaurant operations benefit from connected systems that streamline ordering, billing, reporting, and day-to-day management."
      ]
    },

    {
      heading: "Building a Strong Foundation for Growth",
      paragraphs: [
        "Sustainable growth comes from efficient operations. Restaurants that focus on visibility, consistency, and process improvement are better positioned to serve more customers and scale successfully.",
        "Avoiding these common restaurant management mistakes can improve operational efficiency, enhance guest experiences, and create a stronger foundation for long-term growth."
      ]
    }
  ]
},


{
  id: 7,
  slug: "improving-kitchen-efficiency-with-digital-workflows",
  title: "Improving Kitchen Efficiency with Digital Workflows",
  category: "Operations",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.opt_3,

  excerpt:
    "Digital kitchen workflows help restaurants improve coordination, reduce order errors, and speed up food preparation. Discover how connected kitchen operations create a more efficient and consistent dining experience.",

  sections: [
    {
      paragraphs: [
        "The kitchen is the heart of every food business. Even when customer demand is high, inefficient kitchen operations can lead to delays, order mistakes, and inconsistent service. That's why many modern restaurants are adopting digital workflows to improve speed and coordination."
      ]
    },

    {
      heading: "The Problem with Manual Processes",
      paragraphs: [
        "Traditional kitchen operations often depend on handwritten notes, verbal communication, or printed tickets. During busy hours, this can create confusion, missed instructions, and unnecessary delays.",
        "As order volumes increase, manual workflows become harder to manage effectively."
      ]
    },

    {
      heading: "Real-Time Order Visibility",
      paragraphs: [
        "Kitchen management software allows orders to move directly from the ordering system to the kitchen in real time. Chefs and kitchen staff receive accurate order details instantly, reducing the risk of communication errors.",
        "This helps teams stay organized and prioritize orders more efficiently."
      ]
    },

    {
      heading: "Faster Preparation and Service",
      paragraphs: [
        "When kitchen staff have clear visibility into incoming orders, preparation becomes more streamlined. Digital workflows reduce bottlenecks and help improve coordination between service staff and kitchen teams.",
        "The result is faster service and a smoother guest experience."
      ]
    },

    {
      heading: "Better Operational Control",
      paragraphs: [
        "Digital kitchen operations provide greater visibility into order status, preparation times, and workflow efficiency. Restaurant managers can identify delays, monitor performance, and make improvements based on real operational data."
      ]
    },

    {
      heading: "Building a More Efficient Kitchen",
      paragraphs: [
        "Kitchen efficiency isn't just about working faster—it's about working smarter. Digital workflows help restaurants reduce errors, improve communication, and deliver consistent service even during peak hours.",
        "For modern food businesses, connected kitchen operations have become an essential part of delivering a better customer experience."
      ]
    }
  ]
},


{
  id: 8,
  slug: "how-qr-ordering-streamlines-daily-restaurant-operations",
  title: "How QR Ordering Streamlines Daily Restaurant Operations",
  category: "Operations",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.opt_4,

  excerpt:
    "QR ordering simplifies restaurant workflows by reducing wait times, improving order accuracy, and helping teams deliver faster, more efficient service every day.",

  sections: [
    {
      paragraphs: [
        "Restaurant operations depend on speed, coordination, and accuracy. During busy hours, even small delays in taking orders or communicating with the kitchen can impact customer experience. This is why many food businesses are adopting QR ordering systems to simplify daily operations."
      ]
    },

    {
      heading: "Faster Ordering Process",
      paragraphs: [
        "With a QR ordering system, guests can browse the menu and place orders directly from their smartphones. This eliminates the need to wait for a physical menu or a staff member to take the order, helping restaurants serve customers more efficiently."
      ]
    },

    {
      heading: "Better Order Accuracy",
      paragraphs: [
        "Manual order taking can sometimes lead to communication errors or missed customizations. QR ordering allows customers to submit their preferences directly, ensuring the kitchen receives accurate order details every time."
      ]
    },

    {
      heading: "Improved Team Efficiency",
      paragraphs: [
        "When orders are placed digitally, they can be routed instantly to the kitchen or service team. Staff spend less time managing routine order-taking tasks and more time focusing on hospitality and guest support."
      ]
    },

    {
      heading: "Real-Time Workflow Visibility",
      paragraphs: [
        "Modern restaurant workflow systems provide visibility into order status from placement to completion. This helps improve coordination between front-of-house and kitchen teams while keeping operations organized during peak hours."
      ]
    },

    {
      heading: "A Smarter Way to Operate",
      paragraphs: [
        "QR ordering is more than a convenience feature—it helps restaurants reduce delays, improve service quality, and create smoother day-to-day operations.",
        "As customer expectations continue to evolve, digital ordering systems are becoming an important part of running an efficient and modern food business."
      ]
    }
  ]
},

//growth

{
  id: 9,
  slug: "how-better-customer-experiences-lead-to-more-repeat-orders",
  title: "How Better Customer Experiences Lead to More Repeat Orders",
  category: "Growth",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.grw_1,

  excerpt:
    "Customer loyalty is built through exceptional experiences. Learn how convenience, consistency, and great service encourage repeat visits and drive long-term restaurant growth.",

  sections: [
    {
      paragraphs: [
        "Acquiring new customers is important, but long-term restaurant growth often comes from turning first-time visitors into regular guests. One of the most effective ways to achieve this is by delivering a consistently great customer experience."
      ]
    },

    {
      heading: "First Impressions Matter",
      paragraphs: [
        "A guest's experience begins long before the food arrives. Easy ordering, clear menus, fast service, and a welcoming atmosphere all contribute to how customers perceive a restaurant.",
        "When the experience feels smooth and enjoyable, customers are more likely to return."
      ]
    },

    {
      heading: "Convenience Drives Loyalty",
      paragraphs: [
        "Modern diners value convenience. Features like QR ordering, digital payments, and real-time order updates reduce friction and make dining more comfortable.",
        "The easier it is for guests to interact with your restaurant, the more likely they are to visit again."
      ]
    },

    {
      heading: "Consistency Builds Trust",
      paragraphs: [
        "Customers return to restaurants they can rely on. Consistent service, accurate orders, and predictable experiences help build confidence and strengthen customer relationships over time.",
        "Even small operational improvements can significantly impact customer retention."
      ]
    },

    {
      heading: "Listen to Customer Feedback",
      paragraphs: [
        "Guest feedback provides valuable insights into what's working and what needs improvement. Restaurants that actively listen and respond to customer concerns often create stronger relationships and higher satisfaction levels."
      ]
    },

    {
      heading: "Repeat Customers Fuel Growth",
      paragraphs: [
        "Returning guests typically spend more, visit more frequently, and recommend restaurants to friends and family. Focusing on customer retention can be more cost-effective than constantly acquiring new customers."
      ]
    },

    {
      heading: "Creating Experiences Worth Returning For",
      paragraphs: [
        "Great food may attract customers once, but great experiences bring them back. Restaurants that prioritize convenience, consistency, and customer satisfaction are better positioned to build loyalty and achieve sustainable growth.",
        "In today's competitive market, customer experience is one of the strongest drivers of repeat orders and long-term success."
      ]
    }
  ]
},

{
  id: 10,
  slug: "restaurant-marketing-ideas-for-local-food-businesses",
  title: "Restaurant Marketing Ideas for Local Food Businesses",
  category: "Growth",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.grw_3,

  excerpt:
    "Discover practical restaurant marketing ideas that help local food businesses attract more customers, strengthen their online presence, and encourage repeat visits through better customer experiences.",

  sections: [
    {
      paragraphs: [
        "Great food alone isn't always enough to attract new customers. In today's competitive market, local food businesses need effective marketing strategies to increase visibility, attract nearby customers, and encourage repeat visits.",
        "Here are a few practical restaurant marketing ideas that can help drive growth."
      ]
    },

    {
      heading: "Strengthen Your Google Presence",
      paragraphs: [
        "Many customers discover restaurants through online searches. Keeping your Google Business Profile updated with accurate information, photos, menus, and customer reviews can significantly improve local visibility."
      ]
    },

    {
      heading: "Encourage Customer Reviews",
      paragraphs: [
        "Positive reviews build trust and influence dining decisions. Encourage satisfied customers to leave reviews after their visit and respond professionally to all feedback."
      ]
    },

    {
      heading: "Use Social Media Consistently",
      paragraphs: [
        "Platforms like Instagram and Facebook allow restaurants to showcase dishes, promotions, and behind-the-scenes moments. Consistent posting helps keep your brand visible and engaged with local audiences."
      ]
    },

    {
      heading: "Promote Seasonal Offers",
      paragraphs: [
        "Limited-time specials, combo deals, and festive menus can create excitement and encourage customers to visit more frequently."
      ]
    },

    {
      heading: "Make Ordering Convenient",
      paragraphs: [
        "Customers are more likely to order when the experience is simple and hassle-free. QR menus, digital ordering, and contactless payments help improve convenience while creating a modern dining experience."
      ]
    },

    {
      heading: "Focus on Customer Retention",
      paragraphs: [
        "Returning customers often generate more value than first-time visitors. Delivering excellent service and maintaining consistent quality encourages repeat business and word-of-mouth referrals."
      ]
    },

    {
      heading: "Marketing Starts with Great Experiences",
      paragraphs: [
        "Successful restaurant marketing isn't only about advertising—it's about creating experiences people want to share. By combining strong local visibility with exceptional customer service, food businesses can build lasting relationships and grow sustainably.",
        "For local restaurants, the most effective marketing strategy is often a combination of great food, memorable experiences, and consistent community engagement."
      ]
    }
  ]
},


{
  id: 11,
  slug: "introducing-swaadsetu-the-operating-system-for-modern-food-services",
  title: "Introducing SwaadSetu: The Operating System for Modern Food Services",
  category: "Updates",
  readTime: "4 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.grw_3,

  excerpt:
    "Meet SwaadSetu—an all-in-one operating platform built to simplify ordering, billing, payments, inventory, and business management for modern food businesses.",

  sections: [
    {
      paragraphs: [
        "Running a food business today involves much more than serving great food. Restaurants, cafés, cloud kitchens, and quick-service outlets must manage menus, orders, billing, payments, staff coordination, customer experiences, and business performance—all while maintaining speed and consistency.",
        "That's exactly why we built SwaadSetu."
      ]
    },

    {
      heading: "Built for Modern Food Businesses",
      paragraphs: [
        "SwaadSetu is an all-in-one operating platform designed to simplify day-to-day restaurant operations. Instead of relying on multiple disconnected tools, businesses can manage everything from a single platform.",
        "From QR-based ordering to billing and business analytics, SwaadSetu helps teams work smarter and serve customers better."
      ]
    },

    {
      heading: "What Can You Do with SwaadSetu?",
      paragraphs: [
        "Restaurants can create digital QR menus, receive orders in real time, track order status, manage billing, monitor inventory, and analyze business performance through a centralized dashboard.",
        "The platform is designed to reduce manual work while improving operational visibility."
      ]
    },

    {
      heading: "Better Experiences for Guests",
      paragraphs: [
        "Modern customers expect convenience. SwaadSetu enables faster ordering, digital payments, and real-time order updates, creating a smoother dining experience from start to finish."
      ]
    },

    {
      heading: "Better Control for Owners",
      paragraphs: [
        "Business owners gain access to valuable insights including sales performance, order trends, customer behavior, and operational metrics. These insights help restaurants make informed decisions and identify opportunities for growth."
      ]
    },

    {
      heading: "The Future of Food Service Operations",
      paragraphs: [
        "Technology is rapidly transforming the hospitality industry. Businesses that embrace digital operations are better positioned to improve efficiency, enhance customer satisfaction, and scale sustainably.",
        "SwaadSetu is built to support that journey.",
        "Whether you're running a café, restaurant, food court, or cloud kitchen, SwaadSetu provides the tools needed to simplify operations and focus on what matters most—delivering great food and exceptional customer experiences."
      ]
    }
  ]
},


{
  id: 12,
  slug: "product-update-real-time-order-tracking-is-now-live",
  title: "Product Update: Real-Time Order Tracking Is Now Live",
  category: "Updates",
  readTime: "3 Min Read",
  author: "SwaadSetu Team",
  date: "June 2026",
  coverImage: Images.grw_4,

  excerpt:
    "Real-Time Order Tracking is now available on SwaadSetu. Keep guests informed with live order updates while improving operational efficiency and restaurant service coordination.",

  sections: [
    {
      paragraphs: [
        "We're excited to announce one of the most requested features on SwaadSetu — Real-Time Order Tracking.",
        "Restaurants can now provide guests with live updates on their orders from confirmation to completion, creating a more transparent and engaging dining experience."
      ]
    },

    {
      heading: "What Is Real-Time Order Tracking?",
      paragraphs: [
        "Once an order is placed through SwaadSetu, customers can view its current status directly on their device.",
        "Order progress is displayed through key stages such as:"
      ],
      bullets: [
        {
          title: "Order Confirmed",
          description: "The restaurant has successfully received the order."
        },
        {
          title: "Preparing",
          description: "The kitchen has started preparing the order."
        },
        {
          title: "Ready to Serve",
          description: "The order is ready for delivery to the customer."
        },
        {
          title: "Completed",
          description: "The order has been successfully served."
        }
      ]
    },

    {
      heading: "Better Experience for Customers",
      paragraphs: [
        "Waiting becomes much easier when customers know exactly what's happening with their order.",
        "Real-time visibility reduces uncertainty, improves communication, and creates a smoother dining experience from start to finish."
      ]
    },

    {
      heading: "Improved Operational Efficiency",
      paragraphs: [
        "Order tracking isn't just beneficial for guests—it also helps restaurant teams.",
        "By reducing status inquiries and improving transparency, staff can focus more on service and hospitality instead of manually providing order updates."
      ]
    },

    {
      heading: "Built for Modern Restaurant Operations",
      paragraphs: [
        "The new tracking system works seamlessly alongside SwaadSetu's QR ordering and digital restaurant management tools.",
        "Orders move through the workflow in real time, ensuring guests and staff remain aligned throughout the process."
      ]
    },

    {
      heading: "Available Now",
      paragraphs: [
        "Real-Time Order Tracking is now available for all SwaadSetu partner restaurants.",
        "This update is part of our ongoing mission to simplify restaurant operations while delivering better experiences for both businesses and customers.",
        "More exciting updates are on the way."
      ]
    }
  ]
},





]


const CATEGORIES: BlogCategory[] = ["All", "Product", "Operations", "Growth", "Updates"]

const categoryAccent: Record<AccentCategory, Accent> = {
  Product: {
    bg: "rgba(34,197,94,0.10)",
    text: "#22c55e",
    border: "rgba(34,197,94,0.25)",
  },

  Operations: {
    bg: "rgba(59,130,246,0.10)",
    text: "#60a5fa",
    border: "rgba(59,130,246,0.25)",
  },

  Growth: {
    bg: "rgba(251,191,36,0.12)",
    text: "#fbbf24",
    border: "rgba(251,191,36,0.30)",
  },

  Updates: {
    bg: "rgba(139,92,246,0.12)",
    text: "#a78bfa",
    border: "rgba(139,92,246,0.30)",
  },

  Article: {
    bg: "rgba(251,191,36,0.08)",
    text: "#fbbf24",
    border: "rgba(251,191,36,0.20)",
  },
};


const getAccent = (category: BlogPost["category"]): Accent => {
  return categoryAccent[category];
};
/* ═══════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════ */
const BlogsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [search, setSearch] = useState("");
  // const [email, setEmail] = useState("");
  // const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        search.trim().length === 0 ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Swaad Setu Blog – Insights for Modern Restaurant Teams</title>
        <meta name="description" content="Explore product updates, practical guides, and stories from restaurants using Swaad Setu to grow faster and serve better." />
        <meta property="og:title" content="Swaad Setu Blog – Insights for Modern Restaurant Teams" />
        <meta property="og:description" content="Explore product updates, practical guides, and stories from restaurants using Swaad Setu to grow faster and serve better." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.swaadsetu.com/blogs" />
        <meta property="og:image" content="https://www.swaadsetu.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Swaad Setu Blog – Insights for Modern Restaurant Teams" />
        <meta name="twitter:description" content="Explore product updates, practical guides, and stories from restaurants using Swaad Setu to grow faster and serve better." />
        <meta name="twitter:image" content="https://www.swaadsetu.com/logo.png" />
      </Helmet>

      <div data-theme="swaad-dark" className="min-h-screen bg-[#060812] text-base-content overflow-x-hidden">

        {/* ── Fixed header ── */}
        {/* ── Global background grid (matches Hero exactly) ── */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* ── Global radial glows (matches Hero) ── */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-amber-500/10 blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-orange-600/10 blur-[140px]" />
        </div>

        <header className="fixed top-0 left-0 w-full z-50 bg-[#060812]/80 backdrop-blur-md border-b border-amber-400/10">
          <Navbar />
          <div className="px-0 -mx-6 py-2">
            <BackButton />
          </div>
        </header>

        {/* ════════════════════════════════════
            HERO
        ════════════════════════════════════ */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-amber-500/8 blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => <Particle key={i} {...p} />)}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
            {/* Rule + eyebrow */}
            <motion.div {...fadeUp(0.05)} className="flex items-center gap-4 mb-8">
              <div className="h-px w-14 bg-amber-400/30" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400/70">
                SWAADSETU BLOG
              </span>
              <div className="h-px w-8 bg-amber-400/30" />
            </motion.div>

            <motion.h1
              {...fadeUp(0.12)}
              className="text-4xl sm:text-5xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-6"
            >
              Insights for
              <br />
              Modern{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Food Businesses
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-slate-400 text-lg leading-relaxed max-w-lg font-light mb-10">
             Explore product updates, operational best practices, customer experience strategies, and business growth tips.
            </motion.p>

            {/* Search + filter row */}
            <motion.div {...fadeUp(0.28)} className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative md:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/[0.04] border border-amber-400/15 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-colors"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-amber-400 text-black border-amber-400"
                        : "bg-transparent text-slate-400 border-amber-400/20 hover:border-amber-400/45 hover:text-amber-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full-width rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        {/* ════════════════════════════════════
            BLOG GRID
        ════════════════════════════════════ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-24"
                >
                  <p className="text-slate-400 text-lg mb-2">No articles found.</p>
                  <p className="text-slate-600 text-sm">Try a different search or category.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredPosts.map((post, idx) => {
                    const accent = getAccent(post.category);
                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -4, boxShadow: `0 0 36px 2px ${accent.bg}` }}
                        className="group flex flex-col rounded-2xl border border-amber-400/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-amber-400/25 cursor-pointer"
                      >
                        {/* Cover image */}
                        <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden h-44 shrink-0">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-base-200/80 via-transparent to-transparent" />
                          {/* Category badge on image */}
                          <span
                            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border backdrop-blur-sm"
                            style={{ background: accent.bg, color: accent.text, borderColor: accent.border }}
                          >
                            {post.category}
                          </span>
                        </Link>

                        {/* Body */}
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-widest text-slate-600">{post.readTime}</span>
                            <span className="text-[10px] text-slate-600">{post.date}</span>
                          </div>

                          <h2 className="text-sm font-black leading-snug text-white mb-2 group-hover:text-amber-100 transition-colors line-clamp-2 flex-1">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>

                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-amber-400/10 mt-auto">
                            <p className="text-[11px] font-semibold text-slate-400">{post.author}</p>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-amber-400 transition-colors"
                            >
                              Read more
                              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Newsletter interstitial (matches page.tsx pattern) ── */}
           {filteredPosts.length > 0 && (
<motion.div
{...fadeUp(0.1)}
className="relative mt-14 rounded-3xl overflow-hidden border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10"

>


{/* Background Grid */}



<div
  className="absolute inset-0 opacity-20 pointer-events-none"
  style={{
    backgroundImage:
      "linear-gradient(rgba(251,191,36,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.06) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  }}
/>

{/* Glow Effect */}
<div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/20 blur-[120px] rounded-full" />

<div className="relative z-10 px-8 py-12 md:px-12 md:py-14 text-center max-w-3xl mx-auto">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6">
    Featured Insight
  </div>

  <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
    Why More Restaurants Are Switching To
    <span className="block bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
      QR Menus
    </span>
  </h3>

  <p className="text-slate-400 text-lg leading-relaxed mb-8">
    Discover how QR menus help restaurants reduce printing costs,
    update menus instantly, improve order accuracy, and create a
    faster dining experience for customers.
  </p>

  <Link
    to="/blog/qr-menu-vs-traditional-menu"
    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300"
  >
    Read Full Article

    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  </Link>
</div>


</motion.div>
)}

          </div>
        </section>

        {/* ════════════════════════════════════
            CTA BAND
        ════════════════════════════════════ */}
        {/* <section className="relative py-24 overflow-hidden">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-24" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div {...fadeUp(0.05)} className="mb-4">
              <div className="badge badge-outline border-amber-400/40 text-amber-300 bg-amber-400/5 gap-2 px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Join 58+ restaurants already live
              </div>
            </motion.div>
            <motion.h2 {...fadeUp(0.15)} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">transform</span>{" "}
              your restaurant?
            </motion.h2>
            <motion.p {...fadeUp(0.25)} className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Get a personalised demo and see SwaadSetu live in your restaurant in under 30 minutes.
            </motion.p>
            <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true", "_blank")}
                className="btn btn-lg bg-gradient-to-r from-amber-400 to-orange-400 text-black font-bold border-none shadow-[0_0_32px_rgba(251,191,36,0.4)] hover:shadow-[0_0_48px_rgba(251,191,36,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-200 rounded-xl flex items-center justify-center gap-2 px-3 py-2 cursor-pointer"
              >
                Book a Free Demo
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                className="btn btn-lg btn-ghost border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/60 transition-all duration-200 rounded-xl px-3 py-2 cursor-pointer"
                onClick={() => (window.location.href = "https://www.swaadsetu.com/features")}
              >
                See All Features
              </button>
            </motion.div>
          </div>
        </section> */}
         
         <CTASection/>
        <Footer />
      </div>
    </>
  );
};

export default BlogsPage;