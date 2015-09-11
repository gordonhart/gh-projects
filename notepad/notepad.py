import boto3
from boto.s3.connection import S3Connection
from boto.s3.key import Key


class Notepad:
	'''
	Class to handle the saving of notes on the notepad.
	Interfaces with AWS S3 CDN.
	'''
	access_key = 'AKIAIHVHVQTXIOVI6V5A'
	secret_key = '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'

	def __init__(self):
		self.connection = S3Connection(Notepad.access_key, Notepad.secret_key)
		self.bucket = self.connection.get_bucket('gh-testbucket')

		self.notes_key = self.bucket.get_key('notepad.txt')
		self.notes = self.notes_key.get_contents_as_string()
		print self.notes


	def set_notes(self, notes):
		'''
		Update the notes in the S3 bucket.
		'''
		self.notes = notes
		print 'notes set to: %s' % self.notes

		self.notes_key.set_contents_from_string(self.notes) # put new notes in bucket

		return self.notes

