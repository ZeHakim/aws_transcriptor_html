import json
import boto3

def lambda_handler(event,context):
    s3_client = boto3.resource("s3")
    bucket = "hakim-files-transcribe"
    filesList = []
    files = s3_client.Bucket(bucket).objects.all()
    for file in files:
        if (file.key == ".write_access_check_file.temp"):
            continue
        filesList.append(file.key)


    return {
        'statusCode': 200,
        'body': json.dumps(filesList)
    }