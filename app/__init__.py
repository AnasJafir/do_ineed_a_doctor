from flask import Flask, render_template, url_for, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError, EqualTo
from flask_bcrypt import Bcrypt
from flask_limiter import Limiter
from datetime import timedelta
import os

username = os.environ.get('DB_USERNAME')
password = os.environ.get('DB_PASSWORD')
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{username}:{password}@localhost/do_i_need_a_doctor?client_encoding=UTF8' #connect our app file to our database
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') # Secret key to secure the session cookie
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)  # Set session timeout to 30 minutes
app.config['SESSION_COOKIE_SECURE'] = True  # Secure cookies (ensure HTTPS)

db = SQLAlchemy(app) # Initialize the database instance
bcrypt = Bcrypt(app) # Initialize the Bcrypt instance
limiter = Limiter(app) # Initialize the Limiter instance

login_manager = LoginManager() #It makes our app work with Flask-Login to handle user authentication
login_manager.init_app(app) # Initialize the LoginManager instance
login_manager.login_view = 'login' # Define the login route for login_manager

@login_manager.user_loader #this callback is used to reload the user object from the user id stored in the session
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True) # nullable means that the field cannot be empty and unique means that the field must be unique no two users can have the same username
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(500), nullable=False)

class RegisterForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    email = StringField(validators=[InputRequired(), Length(min=4, max=120)], render_kw={"placeholder": "Email"})
    password = PasswordField(validators=[InputRequired(), Length(min=4, max=200)], render_kw={"placeholder": "Password"})
    confirm_password = PasswordField(validators=[InputRequired(), EqualTo('password'), Length(min=4, max=200)], render_kw={"placeholder": "Confirm Password"})
    submit = SubmitField("Register")
    
    def validate_username(self, username):
        existing_user = User.query.filter_by(username=username.data).first()
        if existing_user:
            raise ValidationError("That username is taken. Please choose a different one.")
    
    def validate_email(self, email):
        existing_user = User.query.filter_by(email=email.data).first()
        if existing_user:
            raise ValidationError("This email is already registered.")
        
class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField("Login")

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard', methods=['GET', 'POST'])
@login_required #This decorator is used to protect the route and make it accessible only to authenticated users
def dashboard():
    return render_template('dashboard.html')

@app.route('/login', methods=['GET', 'POST'])
@limiter.limit("5 per minute") #This decorator is used to limit the number of requests that can be made to the route
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user, remember=True)
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid username or password', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        new_user = User(username=form.username.data, password=hashed_password, email=form.email.data)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

with app.app_context():  # Ensure an application context is active
    db.create_all()  # Create the tables in the database
