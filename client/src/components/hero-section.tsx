import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-bof-blue to-bof-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stay flexible with Business Oldies Funds Advantage Banking
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              An account that gives you more options with the trust and reliability you expect from BOF
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-bof-blue hover:bg-gray-100 px-8 py-3 text-base font-semibold">
                Explore checking solutions
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-bof-blue px-8 py-3 text-base font-semibold"
              >
                Schedule an appointment
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional banking services" 
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
