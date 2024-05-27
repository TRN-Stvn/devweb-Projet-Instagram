from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask import request
from flask_restful import Resource, Api
from werkzeug.utils import secure_filename
import os
from datetime import datetime, timezone
from zoneinfo import ZoneInfo


db = SQLAlchemy()

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_path = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=True)
    date_published = db.Column(db.DateTime, default=lambda: datetime.now(ZoneInfo('Pacific/Bougainville')))


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///images.db'
db.init_app(app)

with app.app_context():
    db.create_all()


class ImageUpload(Resource):
    def post(self):
        file = request.files['image']
        user_id = request.form['user_id']
        category = request.form.get('category')
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join('uploads', filename)
            file.save(file_path)
            new_image = Image(user_id=user_id, title=request.form['title'], description=request.form['description'], image_path=file_path, category=category)
            db.session.add(new_image)
            db.session.commit()
            return {"message": "Image uploaded successfully", "path": file_path, "user_id": user_id}, 201


class ImageResource(Resource):
    def get(self, image_id):
        image = Image.query.get(image_id)
        if image:
            return {"id": image.id, "user_id": image.user_id, "title": image.title, "description": image.description, "image_path": image.image_path}
        else:
            return {"message": "Image not found"}, 404


    def delete(self, image_id):
        image = Image.query.get(image_id)
        if image:
            db.session.delete(image)
            db.session.commit()
            return {"message": "Image deleted successfully"}
        else:
            return {"message": "Image not found"}, 404

    def put(self, image_id):
        image = Image.query.get(image_id)
        if image:
            data = request.form
            if 'title' in data:
                image.title = data['title']
            if 'description' in data:
                image.description = data['description']
            db.session.commit()
            return {"message": "Image updated successfully", "id": image.id}
        else:
            return {"message": "Image not found"}, 404
        

class CategoryResource(Resource):
    def get(self, category_name):
        images = Image.query.filter_by(category=category_name).all()
        if not images:
            return {"message": "No images found in category: {}".format(category_name)}, 404

        result = [{
            "id": img.id,
            "user_id": img.user_id,
            "title": img.title,
            "description": img.description,
            "image_path": img.image_path,
            "category": img.category,
            "date_published": img.date_published.isoformat()
        } for img in images]

        return result, 200
    



class ImageList(Resource):
    def get(self):
        images = Image.query.all()
        return [{"id": img.id,
            "user_id": img.user_id,
            "title": img.title,
            "description": img.description,
            "image_path": img.image_path,
            "category": img.category,
            "date_published": img.date_published.isoformat()} for img in images]


api = Api(app)


api.add_resource(ImageUpload, '/upload')

api.add_resource(ImageList, '/images')

api.add_resource(ImageResource, '/images/<int:image_id>')

api.add_resource(CategoryResource, '/images/category/<string:category_name>')


if not os.path.exists('uploads'):
    os.makedirs('uploads')

if __name__ == '__main__':
    app.run(debug=True)