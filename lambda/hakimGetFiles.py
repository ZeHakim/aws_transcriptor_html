import json
import boto3

def lambda_handler(event,context):
    
    #fileName = event['myParam']
    
    s3_client = boto3.resource("s3")
    bucket = "hakim-audio-files"
    filesList = []
    
    #if fileName == "all":
    files = s3_client.Bucket(bucket).objects.all()
    for file in files:
        filesList.append(file.key)
    
    
    """ 
    for file in files:
            print(file.key)
 
    else:
        file = s3_client.Bucket(bucket).Object(fileName)
        filesList.append(file.key)
        filesList.append(file.get()['Body'].read().decode("utf"))
  """
        
        
    return {
        'statusCode': 200,
        'body': json.dumps(filesList)
    }