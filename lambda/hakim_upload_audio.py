import json
import boto3
import base64

def lambda_handler(event,context):
    
    s3_client = boto3.client('s3')
    s3_resource = boto3.resource("s3")
    
    
    b = base64.b64decode(event['body'])
    file_name = event['file_name']
    bucket = "hakim-audio-files"
    
    s3_client.put_object(Body= b, Bucket=bucket, Key=file_name+".mp3")
    
    audioList = []

    files = s3_resource.Bucket("hakim-audio-files").objects.all()
    
    for file in files:
        audioList.append(file.key)
        
    return {
        'statusCode': 200,
        'body': json.dumps(audioList)
    }
       