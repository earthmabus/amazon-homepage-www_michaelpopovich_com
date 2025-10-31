Get started with a secure static website

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/getting-started-secure-static-website-cloudformation-template.html

update the CSP for the CloudFront distribution with the following:
	default-src 'none'; img-src 'self'; script-src 'self' 'sha256-A1FYnT1QjW1PWpdCVyoIX2FsLqzmQevMHcpeuU5rU/w='; style-src 'self' https://fonts.googleapis.com; object-src 'none'; font-src 'self' https://fonts.gstatic.com data:

so that fonts can be downloaded from google and the inline <script> in the index.html can be run.

https://github.com/earthmabus/python-flask-name-card


