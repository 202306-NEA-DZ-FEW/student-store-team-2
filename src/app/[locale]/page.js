import AddedGrid from "@/components/addedGrid/AddedGrid";
import FeatureBanner from "@/components/features-banner/FeatureBanner";
import HeroCarousel from "@/components/heroCarousel/HeroCarousel";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/testimonials/Testimonials";

export default function Home() {
    return (
        <main className='flex justify-center flex-col items-center'>
            <HeroCarousel />
            <FeatureBanner />
            <AddedGrid />
            <HowItWorks />
            <Testimonials />
        </main>
    );
}
