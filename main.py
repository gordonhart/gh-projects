from flask import Flask, request, session, redirect, url_for, abort, render_template, flash, Response, make_response

import json


# SETUP ======================================================================================

app = Flask(__name__) #APPLICATION
app.config.from_object(__name__)

app.jinja_env.autoescape = False # this allows HTML tags to be read in from strings in the Gallery section
app.jinja_env.lstrip_blocks = True # strip the whitespace from jinja template lines
app.jinja_env.trim_blocks = True

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


# ROUTES =====================================================================================

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
@app.route('/portfolio/gallery')
def portfolio():
	fromTo = getLocs(3)
	return render_template('portfolio.html', locs=fromTo, active='portfolio')


@app.route('/contact')
def contact(): 
	fromTo = getLocs(4)
	return render_template('contact.html', locs=fromTo, active='contact')

# SUB PAGES -------------------------------------

@app.route('/about/why_robots')
def whyRobots():
	fromTo = getLocs(1)

	crumbs = ['about', 'why_robots']
	return render_template('subpages/why_robots.html', locs=fromTo, active='about', crumblist=crumbs)


@app.route('/portfolio/gallery/<gallery>') # dynamic path to different galleries
def gallery(gallery='full'):
	fromTo = getLocs(3)

	filename = 'static/gallery/%s.json' % gallery # read gallery information in from JSON file

	gallery_file = open(filename, 'r') # open and read from JSON file
	gallery_text = gallery_file.read()
	gallery_file.close()
	
	gallery_dict = json.loads(gallery_text) # parse JSON file as text

	crumbs = ['portfolio', gallery]
	return render_template('subpages/gallery.html', locs=fromTo, active='portfolio', gallery=gallery_dict, css="gallery.css", crumblist=crumbs)


# RUN =======================================================================================

if __name__ == '__main__':
	app.run(debug=True)
