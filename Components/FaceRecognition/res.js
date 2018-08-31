
Clarifai
PRODUCTS
SOLUTIONS
DEVELOPERS
COMPANY
DEMO
PRICING
WITOLD
LOG OUT
SEE ALL MODELS
Face Detection
The ‘Face Detection’ model returns probability scores on the likelihood that the image contains human faces and coordinate locations of where those faces appear with a bounding box. This model is great for anyone building an app that monitors or detects human activity.


Please note that this model is currently in BETA testing and may update periodically.


GO TO DOCUMENTATION

Face
2 FACES DETECTED
TRY YOUR OWN IMAGE OR VIDEO
Request
You can call the Predict API with the 'Face Detection' model. Simply pass in an image input with a publicly accessible URL or by directly sending image bytes.

You can learn more about the Predict API in our API Guide.

POST
cURL
JS
Py
Java
ObjC
app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
Response
The Predict API returns probability scores on the likelihood that the media contains human faces. If human faces are detected, the model will also return the coordinate locations of those faces with a bounding box.

The returned ‘bounding_box’ values are the coordinates of the box outlining each face within the image. They are specified as float values between 0 and 1, relative to the image size; the top-left coordinate of the image is (0.0, 0.0), and the bottom-right of the image is (1.0, 1.0). If the original image size is (500 width, 333 height), then the box above corresponds to the box with top-left corner at (208 x, 83 y) and bottom-right corner at (175 x, 139 y). Note that if the image is rescaled (by the same amount in x and y), then box coordinates remain the same. To convert back to pixel values, multiply by the image size, width (for “left_col” and “right_col”) and height (for “top_row” and “bottom_row”).


Response
{
  "status": {
    "code": 10000,
    "description": "Ok"
  },
  "outputs": [
    {
      "id": "cbda717a00b642bcbe27967f1b3e41cf",
      "status": {
        "code": 10000,
        "description": "Ok"
      },
      "created_at": "2016-11-15T23:25:10Z",
      "model": {
        "name": "face-v1.3",
        "id": "a403429f2ddf4b49b307e318f00e528b",
        "created_at": "2016-10-25T19:30:38Z",
        "app_id": null,
        "output_info": {
          "message": "Show output_info with: GET /models/{model_id}/output_info",
          "type": "facedetect"
        },
        "model_version": {
          "id": "c67b5872d8b44df4be55f2b3de3ebcbb",
          "created_at": "2016-10-25T19:30:38Z",
          "status": {
            "code": 21100,
            "description": "Model trained successfully"
          }
        }
      },
      "input": {
        "id": "cbda717a00b642bcbe27967f1b3e41cf",
        "data": {
          "image": {
            "url": "https://samples.clarifai.com/face-det.jpg"
          }
        }
      },
      "data": {
        "regions": [
          {
            "region_info": {
              "bounding_box": {
                "top_row": 0.22296476,
                "left_col": 0.6717238,
                "bottom_row": 0.33909792,
                "right_col": 0.74911636
              }
            }
          },
          {
            "region_info": {
              "bounding_box": {
                "top_row": 0.33878392,
                "left_col": 0.21030195,
                "bottom_row": 0.48806828,
                "right_col": 0.3097716
              }
            }
          },
          {
            "region_info": {
              "bounding_box": {
                "top_row": 0.44855526,
                "left_col": 0.77092654,
                "bottom_row": 0.5739084,
                "right_col": 0.8544279
              }
            }
          }
        ]
      }
    }
  ]
}
COMPONENT	DESCRIPTION
model	The model you are using to make predictions on your inputs with. Includes the id, name, created_at date, output info, and information on the model version.
input	The image data that you passed through the model to make predictions. Includes id and the image data.
data	The data sent back with the reponse; usually includes the detected concepts and corresponding probability values. (If the model's output type is not concepts, you'll see different output responses here.)
Info
MODEL NAME
Face Detection

OWNER
Clarifai

MODEL ID
a403429f2ddf4b49b307e318f00e528b

BETA
Please note that this model is currently in BETA testing and may update periodically

PREVIOUS MODEL
Demographics
NEXT MODEL
Face Embedding
GET STARTED FOR FREE WITH FACE DETECTION MODEL
Start building amazing stuff — no credit card required.

GET YOUR FREE API KEY
Clarifai
PRODUCT
Technology
Model Gallery
Clarifai Explorer
Pricing
DEVELOPERS
Documentation
API Reference
API Status
Community
COMPANY
About
Recent Updates
Careers
Blog
RESOURCES
Support
Contact
Press
© Clarifai, Inc
Terms of Use
Privacy & Security Statement
Content Takedown






