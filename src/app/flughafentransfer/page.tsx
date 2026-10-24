import { PageIntro, CheckList, CallButton } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
export const metadata = {
  title: 'Flughafentransfer – regional & bundesweit',
  description:
    'Flughafentransfers für Reisende und Geschäftsreisende regional und bundesweit anfragen. Hin- und Rückfahrt, Gepäck und Flugnummer per WhatsApp oder E-Mail übermitteln.',
  alternates: { canonical: '/flughafentransfer' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Von Ihrer Haustür in die Welt" title="Entspannt zum Flughafen.">
        <p>
          Für private Reisen und Geschäftsreisen – regional und bundesweit. Starten Sie mit einer
          persönlich abgestimmten Fahrt. Fragen Sie einen Transfer nach Hamburg oder Lübeck an.
          Weitere Flughäfen sind nach Absprache möglich.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container content-grid reverse">
          <div>
            <div className="prose">
              <h2>Ihre Reise. Gut vorbereitet.</h2>
              <p>
                Teilen Sie uns Ihre Abholadresse, den Flughafen und die gewünschte Abholzeit mit.
                Wir besprechen die Fahrt und die Verfügbarkeit mit Ihnen.
              </p>
              <CheckList
                items={[
                  'Fahrten zum und vom Flughafen',
                  'Hin- und Rückfahrt gemeinsam anfragen',
                  'Personen und Gepäck vorab abstimmen',
                  'Flugnummer freiwillig angeben',
                ]}
              />
              <h2>Diese Flughäfen können Sie anfragen</h2>
              <div className="airport-list">
                <span>
                  <strong>HAM</strong>Hamburg
                </span>
                <span>
                  <strong>LBC</strong>Lübeck
                </span>
                <span>
                  <strong>HAJ</strong>Hannover
                  <br />
                  <small>Auf Anfrage</small>
                </span>
                <span>
                  <strong>BER</strong>Berlin Brandenburg
                  <br />
                  <small>Auf Anfrage</small>
                </span>
              </div>
              <h2>Welche Uhrzeit soll ich angeben?</h2>
              <p>
                Tragen Sie die gewünschte Abholzeit ein. Berücksichtigen Sie die empfohlenen
                Ankunftszeiten Ihrer Fluggesellschaft. Wenn Sie unsicher sind, rufen Sie uns bitte
                an.
              </p>
              <p>
                Bei einer Abholung am Flughafen können Sie Ihre Flugnummer ergänzen. Eine
                automatische Flugüberwachung findet über diese Website nicht statt. Änderungen
                teilen Sie uns bitte direkt mit.
              </p>
            </div>
            <div className="help-panel">
              <h3>Eine Frage zu Ihrer Reise?</h3>
              <p>
                Besonderes Gepäck, Kindersitze oder individuelle Ziele stimmen wir persönlich ab.
              </p>
              <CallButton />
            </div>
          </div>
          <div className="form-panel">
            <h2>Transfer anfragen</h2>
            <p className="form-description">
              Felder mit * benötigen wir. Die Fahrt wird erst nach persönlicher Bestätigung
              verbindlich.
            </p>
            <RideForm mode="airport" />
          </div>
        </div>
      </section>
    </>
  );
}
