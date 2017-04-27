# user model
#  {
#     'uesrName':'meme',
#     'sex':'',
#     'password':'',
#     'telphone':'',
#     'email':'',
#     'userId' :''
# }
from mongodbClient import Client


class UserDao:
    def __init__(self):
        self.client = Client()
        self.userCollection = self.client.getCollection('user')

    def registUser(self, user):
        return self.userCollection.insert_one(user)

    def login(self, user):
        user =  self.userCollection.find_one(user)
        if(user is None):
            return False
        else:
            return True
