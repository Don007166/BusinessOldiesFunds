import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BankingProducts() {
  const products = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
      title: "Checking",
      description: "Convenient checking solutions to fit your unique needs",
      items: ["BOF Advantage Banking", "Student Banking", "Business Checking"],
      color: "bg-bof-blue",
      link: "Learn more →"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100-2h12a1 1 0 100 2H4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Savings",
      description: "Savings made simple and rewarding",
      items: ["BOF Advantage Savings", "CDs", "IRAs"],
      color: "bg-green-600",
      link: "Open savings account →"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Credit Cards",
      description: "Find the perfect credit card from our popular options",
      items: ["Cash Back Cards", "Travel Rewards", "Low Interest"],
      color: "bg-purple-600",
      link: "Shop all cards →"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      title: "Home Loans",
      description: "Explore home loans and refinancing options",
      items: ["Mortgage", "Refinance", "Home Equity"],
      color: "bg-orange-600",
      link: "Apply now →"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold text-bof-navy mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  {product.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
                <Button variant="link" className="text-bof-blue hover:underline p-0 h-auto font-semibold">
                  {product.link}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
