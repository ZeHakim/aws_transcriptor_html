import json
import time
import boto3


s3 = boto3.client("s3")
s3_client = boto3.resource("s3")

def lambda_handler(event, context):

    myParam = event['myParam']

    obj = s3_client.Bucket('hakim-files-transcribe').Object(myParam+".json")
    res = json.loads(obj.get()["Body"].read())["results"]["transcripts"][0]["transcript"]
    
    return {
        'statusCode': 200,
        #'body':myParam1+" "+myParam+" "+job_name+" "+s3_uri
        'body': json.dumps(res)
    }