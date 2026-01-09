from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='.')
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    company = data.get('company', '')
    email = data.get('email')
    subject = data.get('subject')
    message_body = data.get('message')

    if not all([name, email, message_body]):
        return jsonify({'error': 'Missing required fields'}), 400

    # formatting subject mapping
    subject_map = {
        'training': 'Anfrage zu Trainings',
        'coaching': 'Anfrage zu Coaching',
        'inhouse': 'Inhouse-Anfrage',
        'ausbildung': 'Ausbildungsprogramme',
        'other': 'Sonstiges',
        '': 'Kein Betreff'
    }
    subject_text = subject_map.get(subject, subject)

    # 1. Email to Support
    try:
        msg_support = Message(
            subject=f"Neue Kontaktanfrage: {subject_text} von {name}",
            recipients=['Kontakt@wtm-consulting.de'],
            body=f"""
Neue Nachricht über das Kontaktformular:

Name: {name}
Unternehmen: {company}
E-Mail: {email}
Betreff: {subject_text}

Nachricht:
{message_body}
            """
        )
        mail.send(msg_support)

        # 2. Confirmation Email to User
        msg_user = Message(
            subject="Ihre Anfrage bei WTM Management Consulting",
            recipients=[email],
            body=f"""
Hallo {name},

vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.

Zusammenfassung Ihrer Anfrage:
Betreff: {subject_text}
Nachricht:
{message_body}

Herzliche Grüße,
Ihr Team von WTM Management Consulting
            """
        )
        mail.send(msg_user)

        return jsonify({'message': 'Nachricht erfolgreich gesendet'}), 200

    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': 'Fehler beim Senden der Nachricht'}), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)
