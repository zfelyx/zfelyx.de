import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // EmailJS Konfiguration aus Umgebungsvariablen (Vite)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug: Zeige ob die Variablen geladen wurden (entfernen in Produktion!)
      console.log('Service ID vorhanden:', !!serviceId);
      console.log('Template ID vorhanden:', !!templateId);
      console.log('Public Key vorhanden:', !!publicKey);

      // Validierung der Umgebungsvariablen
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS Konfiguration fehlt. Bitte überprüfen Sie Ihre .env Datei.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Felix',
        message: formData.message,
      };

      console.log('Sende E-Mail mit Parametern:', templateParams);

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      console.log('EmailJS Antwort:', response);

      setSubmitMessage('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Detaillierter Fehler:', error);

      // Spezifische Fehlermeldungen
      let errorMessage = 'Es gab einen Fehler beim Senden Ihrer Nachricht.';

      if (error.text) {
        errorMessage += ` Fehler: ${error.text}`;
      } else if (error.message) {
        errorMessage += ` Details: ${error.message}`;
      }

      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Kontakt
          </h2>
          <p className="text-center text-base sm:text-xl mb-8 sm:mb-16 text-gray-400">
            Haben Sie Fragen? Schreiben Sie mir!
          </p>
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Ihr Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-Mail</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="ihre.email@beispiel.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Nachricht</label>
              <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                  placeholder="Ihre Nachricht..."
              />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:from-cyan-500 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Senden'}
            </button>
            {submitMessage && (
                <p className={`mt-4 text-center ${submitMessage.includes('Fehler') ? 'text-red-400' : 'text-green-400'}`}>{submitMessage}</p>
            )}
          </form>
        </div>
      </section>
  );
};

export default ContactForm;