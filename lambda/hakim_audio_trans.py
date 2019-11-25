import json
import time
import boto3
from urllib.request import urlopen

transcribe = boto3.client('transcribe')
s3 = boto3.client("s3")
s3_client = boto3.resource("s3")

def lambda_handler(event, context):

    bucket_name = 'hakim-audio-files'
    
    myParam = event['myParam']
    myParam1 = event['myParam1']
    
    file_name = myParam+".mp3"
    job_name = myParam1
    s3_uri = create_uri(bucket_name, file_name)
    
    #job_name = context.aws_request_id
    #job_name = '6d9aa264-37cd-40cc-b2c0-d5192b244056.json'
       

    transcribe.start_transcription_job(TranscriptionJobName = job_name,
		                                   Media = {'MediaFileUri': s3_uri},
		                                   MediaFormat =  'mp3',
		                                   LanguageCode = "fr-FR",
		                                   OutputBucketName = "hakim-files-transcribe")

    
    while True:
        status = transcribe.get_transcription_job(TranscriptionJobName = job_name)
        if status["TransciptionJob"]["TransciptionJobStatus"] == "COMPLETED":
            break
        time.sleep(5)
        time.sleep(5)
        time.sleep(5)
    
    obj = s3_client.Bucket('hakim-files-transcribe').Object(job_name)
    res = json.loads(obj.get()["Body"].read())["results"]["transcripts"][0]["transcript"]
    
    return {
        'statusCode': 200,
        #'body':myParam1+" "+myParam+" "+job_name+" "+s3_uri
        'body': json.dumps(res)
    }

def create_uri(bucket_name, file_name):
    return "s3://"+bucket_name+"/"+file_name
    