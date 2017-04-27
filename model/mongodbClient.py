

from pymongo import MongoClient

class Client():
    def __init__(self):
        self.client = MongoClient('localhost', 27017)
        self.db = self.client.mini_show_db


    def getCollection(self, name):
        return self.db[name];



