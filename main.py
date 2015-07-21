from flask import Flask, request, session, redirect, url_for, abort, render_template, flash, Response, make_response

app = Flask(__name__) #APPLICATION
app.config.from_object(__name__)

# SET UP SESSION VARIABLE -----------------------

app.secret_key = 'gh-projects' # decryption key for session variable

def getLocs(index): # page background scrolling using session variables
	try:
		session['fromLoc'] = session['toLoc'] # set previous location to old destination
		session['toLoc'] = index

	except KeyError: # first time this function is being called, no movement
		session['toLoc'] = index
		session['fromLoc'] = index

#	print "%d to %d" % (session['fromLoc'], session['toLoc'])

	locs = { # new dictionary with locations to pass to template
		'from'	: session['fromLoc'],
		'to'	: session['toLoc']
	}
	return locs

##################
##### ROUTES #####
##################

# HOME PAGE -------------------------------------

@app.route('/')
def landing_page(): 
	fromTo = getLocs(0)
	return render_template('home.html', locs=fromTo) #pass on location attributes

# MAIN PAGES ------------------------------------

@app.route('/about')
def about(): 
	fromTo = getLocs(1)
	return render_template('about.html', locs=fromTo, active='about')


@app.route('/projects')
def projects(): 
	fromTo = getLocs(2)
	return render_template('projects.html', locs=fromTo, active='projects')


@app.route('/portfolio')
def portfolio():
	fromTo = getLocs(3)
	return render_template('portfolio.html', locs=fromTo, active='portfolio')


@app.route('/contact')
def contact(): 
	fromTo = getLocs(4)
	return render_template('contact.html', locs=fromTo, active='contact')

# SUB PAGES -------------------------------------

@app.route('/about/whyRobots')
def whyRobots():
	fromTo = getLocs(1)
	return render_template('whyRobots.html', locs=fromTo, active='about')

##################
##### TO RUN #####
##################

if __name__ == '__main__':
	app.run(debug=True)
