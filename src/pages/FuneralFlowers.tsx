import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';

export function FuneralFlowers() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        serviceDate: '',
        funeralHome: '',
        notes: '',
        agreed: false,
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.fade-in-section').forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const funeralProducts = getProductsByCategory('funeral');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) {
            toast.error('Please agree to the Terms and Conditions');
            return;
        }
        if (!formData.notes) {
            toast.error('Please describe your request in the notes');
            return;
        }
        toast.success('Thank you. We will contact you shortly to confirm details.');
        setFormData({
            customerName: '',
            email: '',
            phone: '',
            serviceDate: '',
            funeralHome: '',
            notes: '',
            agreed: false,
        });

    };

    const faqs = [
        {
            question: 'How much notice do you need for funeral flowers?',
            answer: 'We generally require 24-48 hours notice to ensure we can source specific flowers. However, please call us for urgent requests, and we will do our best to accommodate you.',
        },
        {
            question: 'Can you deliver directly to the funeral home or church?',
            answer: 'Yes, we coordinate delivery directly with local funeral directors and churches to ensure flowers arrive in perfect time for the service.',
        },
        {
            question: 'Can I customise the colours and flowers?',
            answer: 'Absolutely. All our tributes are made to order. You can specify preferred colours and flowers, and we will create a meaningful arrangement that reflects your wishes.',
        },
        {
            question: 'Do you offer handwritten cards?',
            answer: 'Yes, we can include a card with your personal message on any tribute.',
        },
    ];

    return (
        <div ref={sectionRef} className="min-h-screen bg-cream">
            {/* Hero Banner */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center bg-charcoal overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/funeral/funeral_sheaf.jpg')` }}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 px-4 sm:px-6 lg:px-12 w-full">
                    <nav className="flex items-center gap-2 text-sm text-cream/60 mb-8">
                        <Link to="/" className="hover:text-cream transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-cream">Funeral Flowers</span>
                    </nav>

                    <div className="max-w-3xl">
                        <p className="text-label text-dusty mb-4">Sympathy & Remembrance</p>
                        <h1 className="font-serif text-cream mb-6">Funeral Tributes</h1>
                        <p className="text-lg text-cream/80 leading-relaxed max-w-2xl">
                            Thoughtful floral arrangements to honour your loved ones.
                            We offer a personal and sensitive service, creating bespoke tributes
                            with care and respect.
                        </p>
                    </div>
                </div>
            </section>

            {/* Intro Text */}
            <section className="fade-in-section py-16 bg-white border-b border-charcoal/10">
                <div className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-charcoal mb-6">A Personal Tribute</h2>
                    <p className="text-warmgray leading-relaxed text-lg">
                        Flowers offer a beautiful way to express sympathy and say farewell.
                        Whether you need a casket spray for the family or a simple posy from a friend,
                        we are here to guide you. Every arrangement is handcrafted in our studio using fresh,
                        seasonal blooms.
                    </p>
                </div>
            </section>

            {/* Product Selection */}
            <section className="fade-in-section py-12 lg:py-16 bg-cream">
                <div className="px-4 sm:px-6 lg:px-12">
                    <div className="text-center mb-10">
                        <p className="text-label text-dusty mb-2">Our Collection</p>
                        <h2 className="font-serif text-charcoal mb-3">Select Your Tribute</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                        {funeralProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section id="inquiry-form" className="fade-in-section py-16 lg:py-20 bg-white">
                <div className="px-4 sm:px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <p className="text-label text-dusty mb-2">Contact Us</p>
                            <h2 className="font-serif text-charcoal mb-3">Funeral Flower Inquiry</h2>
                            <p className="text-warmgray">
                                Please fill out the form below. We will confirm availability and details with you directly.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-cream/30 border border-charcoal/5 rounded-[10px] p-8 lg:p-10 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="customerName" className="text-label text-charcoal mb-2 block">
                                        Your Name *
                                    </Label>
                                    <Input
                                        id="customerName"
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                        placeholder="Full Name"
                                        required
                                        className="bg-white border-charcoal/20 focus:border-dusty"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-label text-charcoal mb-2 block">
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+353 87 123 4567"
                                        required
                                        className="bg-white border-charcoal/20 focus:border-dusty"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="email" className="text-label text-charcoal mb-2 block">
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                        required
                                        className="bg-white border-charcoal/20 focus:border-dusty"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="serviceDate" className="text-label text-charcoal mb-2 block">
                                        Service Date (Optional)
                                    </Label>
                                    <Input
                                        id="serviceDate"
                                        type="date"
                                        value={formData.serviceDate}
                                        onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                                        className="bg-white border-charcoal/20 focus:border-dusty"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="funeralHome" className="text-label text-charcoal mb-2 block">
                                    Funeral Home / Location (Optional)
                                </Label>
                                <Input
                                    id="funeralHome"
                                    value={formData.funeralHome}
                                    onChange={(e) => setFormData({ ...formData, funeralHome: e.target.value })}
                                    placeholder="e.g. Local Funeral Home, Church name"
                                    className="bg-white border-charcoal/20 focus:border-dusty"
                                />
                            </div>



                            <div>
                                <Label htmlFor="notes" className="text-label text-charcoal mb-2 block">
                                    Additional Notes / Colour Preferences
                                </Label>
                                <textarea
                                    id="notes"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Please describe any specific color requests, ribbon preferences, or card messages here."
                                    rows={4}
                                    className="w-full px-3 py-2 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-dusty resize-none"
                                />
                            </div>

                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="agreed"
                                    checked={formData.agreed}
                                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                    className="w-4 h-4 mt-1 rounded border-charcoal/30 text-dusty focus:ring-dusty"
                                />
                                <Label htmlFor="agreed" className="text-sm text-warmgray cursor-pointer">
                                    I have read and agree to the <Link to="/terms" className="text-dusty hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-dusty hover:underline">Privacy Policy</Link>
                                </Label>
                            </div>

                            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                                <Send className="w-4 h-4" />
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="fade-in-section py-16 lg:py-20 bg-cream">
                <div className="px-4 sm:px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="font-serif text-charcoal">Common Questions</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-[10px] overflow-hidden border border-charcoal/5"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-dusty/5 transition-colors"
                                    >
                                        <span className="font-medium text-charcoal pr-4">{faq.question}</span>
                                        {openFaq === index ? (
                                            <ChevronUp className="w-5 h-5 text-warmgray flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-warmgray flex-shrink-0" />
                                        )}
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 pb-6 border-t border-charcoal/5">
                                            <p className="text-warmgray leading-relaxed pt-4">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
