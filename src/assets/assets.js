import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import loactions from "/public/district.json";
import {
    Activity,
    BadgeCheck,
    BarChart3Icon,
    BellRing,
    CircleUser,
    Clipboard,
    ClipboardCheck,
    ClipboardList,
    CreditCard,
    FileWarning,
    ListTodo,
    LogOutIcon,
    MailIcon,
    MapPinIcon,
    PackageSearchIcon,
    PhoneIcon,
    PlusIcon,
    ShoppingBagIcon,
    TriangleAlert,
    Truck,
    UserCog,
    Users,
} from "lucide-react";
import hero_img_1 from "./hero_img_1.jpg";
import join_drive from "./join_drive.png";

export const assets = {
    join_drive,
};

export const appPromoBannerData = {
    title: "Join Our Clean Drive",
    description:
        "Take part in our upcoming community clean drive and help make Dhaka",
};

export const categoriesData = [
    {
        id: 1,
        title: "Road & Potholes",
        slug: "road-potholes",
        image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        description:
            "Report damaged roads, potholes, cracks, and unsafe road conditions.",
    },
    {
        id: 2,
        title: "Streetlights",
        slug: "streetlights",
        image: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
        description:
            "Broken, flickering, or non-working street lights in your area.",
    },
    {
        id: 3,
        title: "Water Leakage",
        slug: "water-leakage",
        image: "https://cdn-icons-png.flaticon.com/512/728/728093.png",
        description: "Leaking pipes, water overflow, and supply line issues.",
    },
    {
        id: 7,
        title: "Electricity",
        slug: "electricity",
        image: "https://cdn-icons-png.flaticon.com/512/2942/2942813.png",
        description:
            "Power outage, loose wires, transformers, and electric hazards.",
    },

    {
        id: 4,
        title: "Garbage & Waste",
        slug: "garbage-waste",
        image: "https://cdn-icons-png.flaticon.com/512/2920/2920324.png",
        description:
            "Uncollected garbage, dumping issues, and waste management problems.",
    },
    {
        id: 5,
        title: "Drainage",
        slug: "drainage",
        image: "https://cdn-icons-png.flaticon.com/512/1684/1684375.png",
        description:
            "Blocked drains, waterlogging, and sewage-related complaints.",
    },
    {
        id: 6,
        title: "Footpath & Sidewalk",
        slug: "footpath-sidewalk",
        image: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
        description:
            "Broken sidewalks, unsafe footpaths, and pedestrian issues.",
    },
    {
        id: 8,
        title: "Traffic Signal",
        slug: "traffic-signal",
        image: "https://cdn-icons-png.flaticon.com/512/3669/3669984.png",
        description: "Traffic light malfunction and road signal problems.",
    },
];

export const issueCategories = [
    "Road & Potholes",
    "Streetlights",
    "Water Leakage",
    "Garbage & Waste",
    "Drainage",
    "Footpath & Sidewalk",
    "Electricity",
    "Public Safety",
    "Traffic Signal",
    "Other",
];

export const statusCollection = [
    "pending",
    "rejected",
    "in-progress",
    "working",
    "resolved",
    "closed",
];

export const priorityCollection = ["normal", "high"];

export const footerData = {
    brand: {
        name: "CityFix",
        description:
            "CityFix is a platform for citizens to report local issues, track progress, and see resolutions in real-time. From road repairs to streetlight outages, we make your city better together.",
        socials: [
            { icon: SiFacebook, link: "#" },
            { icon: SiX, link: "#" },
            { icon: SiInstagram, link: "#" },
        ],
    },

    sections: [
        {
            title: "Quick Links",
            links: [
                { label: "All Products", to: "/products" },
                { label: "Flash Deals", to: "/deals" },
                { label: "Track Order", to: "/orders" },
                { label: "Delivery Partner", to: "/delivery" },
            ],
        },
        {
            title: "Customer Service",
            links: [
                { label: "My Account", to: "#" },
                { label: "Order History", to: "#" },
                { label: "Addresses", to: "#" },
                { label: "Help Center", href: "#" },
            ],
        },
    ],

    contact: [
        { icon: MapPinIcon, text: "123 Green Valley Rd, Portland" },
        { icon: PhoneIcon, text: "+1 (111) 123-4567" },
        { icon: MailIcon, text: "hello@example.com" },
    ],

    bottom: {
        copyright: "© 2026 CityFix. All rights reserved.",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
        ],
    },
};

export const heroSectionData = {
    description:
        "Submit garbage reports instantly and help our community maintain a healthy, beautiful environment.",
    hero_image_1: hero_img_1,
    hero_features: [
        {
            icon: TriangleAlert,
            title: "Easy Reporting",
            desc: "Report issues instantly",
        },
        {
            icon: Activity,
            title: "Live Tracking",
            desc: "Follow updates instantly",
        },
        {
            icon: BellRing,
            title: "Live Updates",
            desc: "Receive notifications instantly",
        },
        {
            icon: BadgeCheck,
            title: "Verified Resolution",
            desc: "Confirmed issue closure",
        },
    ],
};

export const dashboardLinkData = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: BarChart3Icon,
        role: ["admin", "staff", "citizen"],
    },
    // ------- citzen links --------
    {
        to: "/dashboard/issues/new",
        label: "Report Issue",
        icon: PlusIcon,
        role: ["citizen"],
    },
    {
        to: "/dashboard/my-issues",
        label: "My Issues",
        icon: ClipboardList,
        role: ["citizen"],
    },
    // ------- Admin links --------
    {
        to: "/dashboard/all-issues",
        label: "All Issues",
        icon: ListTodo,
        role: ["admin"],
    },
    {
        to: "/dashboard/manage-users",
        label: "Manage Users",
        icon: Users,
        role: ["admin"],
    },
    {
        to: "/dashboard/manage-staffs",
        label: "Manage Staffs",
        icon: UserCog,
        role: ["admin"],
    },
    {
        to: "/dashboard/payments",
        label: "Payments",
        icon: CreditCard,
        role: ["admin"],
    },

    // ------- Staff links --------

    {
        to: "/dashboard/assigned-issues",
        label: "Assigned Issues",
        icon: ClipboardCheck,
        role: ["staff"],
    },

    {
        to: "/dashboard/profile",
        label: "My Profile",
        icon: CircleUser,
        role: ["admin", "staff", "citizen"],
    },
    {
        to: "/",
        label: "Exit",
        icon: LogOutIcon,
        role: ["admin", "staff", "citizen"],
    },
];

export const regions = [...new Set(loactions.map((d) => d.region))];

export const districtsByRegion = (selectedRegion) => {
    return loactions
        .filter((item) => item.region === selectedRegion)
        .map((item) => item.district);
};
