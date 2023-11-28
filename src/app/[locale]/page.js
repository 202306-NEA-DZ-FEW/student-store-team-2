import { getLatestProducts, getTestimonials } from "@/lib/_supabase";

import AddedGrid from "@/components/addedGrid/AddedGrid";
import FeatureBanner from "@/components/features-banner/FeatureBanner";
import Footer from "@/components/footer/Footer";
import HeroCarousel from "@/components/heroCarousel/HeroCarousel";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/testimonials/Testimonials";

export default async function Home() {
    const latestProducts = await getLatestProducts();
    const testimonials = await getTestimonials();
    return (
        <main className='flex justify-center flex-col items-center'>
            <HeroCarousel />
            <FeatureBanner />
            <AddedGrid latestProducts={latestProducts} />
            <HowItWorks />
            <Testimonials testimonials={testimonials} />
            <Footer />
        </main>
    );
}
