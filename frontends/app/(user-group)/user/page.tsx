import BranchMap from "@/components/home/branch-map";
import CarSlider from "@/components/home/car-slider";
import PricingSection from "@/components/home/pricing-section";
import ReviewSection from "@/components/home/review-section";
import Hero from "@/components/layouts/hero";

export default function HomeUserPage() {
    return (
        <div className="p-6">
            <Hero />
            <CarSlider />
            <PricingSection />
            <ReviewSection />
            <BranchMap />
        </div>
    );
}
