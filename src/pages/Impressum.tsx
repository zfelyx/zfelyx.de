import { Link } from 'react-router-dom'
import Snowfall from '../components/Snowfall'


export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">Impressum</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <Snowfall />
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Angaben gemäß § 5 TMG</h2>
            <p className="mb-2 leading-loose text-lg text-justify">
              Felix Schneider<br />
              [Thomas-Müntzer-Siedlung]<br />
              [09661 Hainichen]<br />
              Deutschland
            </p>
            <p className="mb-2 leading-loose text-lg text-justify">
              <strong>Kontakt:</strong><br />
              E-Mail: felix.schneider008@outlook.de
            </p>
          </section>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="leading-loose text-lg text-justify">
              Felix Schneider<br />
              [Thomas-Müntzer-Siedlung]<br />
              [09661 Hainichen]<br />
              Deutschland
            </p>
          </section>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Haftungsausschluss</h2>
            <h3 className="text-xl font-medium mb-2 text-gray-300">Haftung für Inhalte</h3>
            <p className="mb-4 leading-loose text-lg text-justify text-gray-200">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-300">Haftung für Links</h3>
            <p className="mb-4 leading-loose text-lg text-justify text-gray-200">
              Verweise und Links auf Webseiten Dritter liegen außerhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Wir haben keinen Einfluss auf die Gestaltung und die Inhalte der verlinkten Seiten. Deshalb distanzieren wir uns hiermit ausdrücklich von allen Inhalten aller verlinkten Seiten auf unserer Homepage und machen uns ihre Inhalte nicht zu eigen. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in von uns eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-300">Urheberrecht</h3>
            <p className="mb-4 leading-loose text-lg text-justify text-gray-200">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Datenschutz</h2>
            <p className="mb-4 leading-loose text-lg text-justify text-gray-200">
              Diese Website verwendet keine Cookies und sammelt keine personenbezogenen Daten. Es werden keine Tracking-Tools verwendet.
            </p>
            <p className="mb-4 leading-loose text-lg text-justify text-gray-200">
              Bei Fragen zum Datenschutz können Sie mich per E-Mail kontaktieren: felix.schneider008@outlook.de
            </p>
          </section>
        </div>

        <div className="text-center">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">Zurück zur Startseite</Link>
        </div>
      </div>
    </div>
  )
}
