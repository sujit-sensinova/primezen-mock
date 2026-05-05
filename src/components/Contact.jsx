import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, ArrowLeft, Home, Building2, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    focus: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const steps = [
    {
      title: "How can we reach you?",
      subtitle: "Share your details first, then we will map the right Zen Touch Panel setup.",
      fields: (
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand transition-colors">
              <User size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Your Full Name"
              required
              className="w-full bg-black/5 border-none rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-brand outline-none transition-all text-black font-medium"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand transition-colors">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Email Address"
                required
                className="w-full bg-black/5 border-none rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-brand outline-none transition-all text-black font-medium"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand transition-colors">
                <Phone size={20} />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number"
                required
                className="w-full bg-black/5 border-none rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-brand outline-none transition-all text-black font-medium"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute left-6 top-6 text-text-secondary group-focus-within:text-brand transition-colors">
              <MessageSquare size={20} />
            </div>
            <textarea 
              rows="4" 
              placeholder="Additional Details (Optional)"
              className="w-full bg-black/5 border-none rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-brand outline-none transition-all text-black font-medium resize-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button type="submit" className="flex-1 px-10 py-5 bg-brand text-white rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3">
               Continue <ArrowRight size={18} />
             </button>
          </div>
        </div>
      )
    },
    {
      title: "What are we upgrading?",
      subtitle: "Select the property type for your project.",
      fields: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Luxury Villa', 'Modern Apartment', 'Corporate Office', 'Retail Space'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { setFormData({ ...formData, propertyType: type }); nextStep(); }}
              className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between group ${
                formData.propertyType === type ? 'border-brand bg-brand/5 shadow-lg' : 'border-black/5 hover:border-black/20 bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  formData.propertyType === type ? 'bg-brand text-white' : 'bg-black/5 text-black'
                }`}>
                  {type.includes('Villa') || type.includes('Apartment') ? <Home size={24} /> : <Building2 size={24} />}
                </div>
                <span className="font-bold text-lg text-black">{type}</span>
              </div>
              <ArrowRight className={`transition-transform duration-300 ${formData.propertyType === type ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </button>
          ))}
          <button type="button" onClick={prevStep} className="col-span-full mt-4 flex items-center gap-2 text-text-secondary font-bold hover:text-black transition-colors">
            <ArrowLeft size={18} /> Back to contact details
          </button>
        </div>
      )
    },
    {
      title: "What is your primary focus?",
      subtitle: "Choose the solution you're most interested in.",
      fields: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Touch Panel Upgrade', 'Lighting & Fan Control', 'Curtain & AC Control', 'Complete Room Scenes'].map((focus) => (
            <button
              key={focus}
              type="button"
              onClick={() => setFormData({ ...formData, focus })}
              className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between group ${
                formData.focus === focus ? 'border-brand bg-brand/5 shadow-lg' : 'border-black/5 hover:border-black/20 bg-white'
              }`}
            >
              <span className="font-bold text-lg text-black">{focus}</span>
              <CheckCircle2 className={`transition-all duration-300 ${formData.focus === focus ? 'opacity-100 text-brand scale-100' : 'opacity-0 scale-75 group-hover:opacity-40'}`} />
            </button>
          ))}
          <div className="col-span-full mt-4 flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={prevStep} className="px-10 py-5 rounded-2xl font-bold text-text-secondary hover:bg-black/5 transition-colors border border-black/5 flex items-center justify-center gap-2">
              <ArrowLeft size={18} /> Back
            </button>
            <button type="submit" disabled={!formData.focus} className="flex-1 px-10 py-5 bg-brand text-white rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed">
              Request Consultation <Send size={18} />
            </button>
          </div>
        </div>
      )
    }
  ];

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] p-12 md:p-20 text-center shadow-2xl border border-black/5"
      >
        <div className="w-24 h-24 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="title-font text-4xl font-bold mb-4 text-black">Request Received</h2>
        <p className="text-xl text-text-secondary max-w-md mx-auto leading-relaxed">
          Thank you, {formData.name.split(' ')[0]}. Our automation specialist will reach out to you within 24 hours to schedule your consultation.
        </p>
        <Button onClick={() => {setIsSubmitted(false); setStep(1);}} className="mt-12">Return Home</Button>
      </motion.div>
    );
  }

  const currentStepData = steps[step - 1];

  return (
    <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-black/5 relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(step / steps.length) * 100}%` }}
          className="h-full bg-brand origin-left"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.form 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onSubmit={(e) => {
            e.preventDefault();
            if (step === steps.length) {
              setIsSubmitted(true);
              return;
            }
            nextStep();
          }}
          className="relative z-10"
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-widest mb-2">
              <span className="w-8 h-[2px] bg-brand" /> Step {step} of {steps.length}
            </div>
            <h2 className="title-font text-4xl md:text-5xl font-bold mb-3 text-black tracking-tight">{currentStepData.title}</h2>
            <p className="text-lg text-text-secondary font-medium">{currentStepData.subtitle}</p>
          </div>

          {currentStepData.fields}
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-6 bg-bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rotate-45" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        {/* Left — Copy */}
        <div className="lg:col-span-5 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Contact Us</span>
            <h2 className="title-font text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-tight mb-8 leading-[1] text-black">Ready to Upgrade Your Switches?</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black text-xl mb-1">Email Us</h4>
                  <p className="text-text-secondary text-lg font-medium">sales@primezen.in</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black text-xl mb-1">Call Us</h4>
                  <p className="text-text-secondary text-lg font-medium">+91 95867 74775</p>
                </div>
              </div>
              <div className="p-8 rounded-[32px] bg-white border border-black/5 shadow-xl shadow-black/5">
                <h4 className="font-bold text-black text-xl mb-4">Vadodara HQ</h4>
                <p className="text-text-secondary leading-relaxed text-lg font-medium">
                  C K Patel Estate Survey Number 372, Chhani, Vadodara – 391740
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — The Multi-Step Form */}
        <div className="lg:col-span-7">
          <MultiStepForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
