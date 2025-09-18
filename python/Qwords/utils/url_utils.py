from flask import current_app
from logging import getLogger
logger = getLogger(__name__)

def get_prefixed_url(path):
    behind_proxy = current_app.config.get('BEHIND_PROXY', True)
    prefix = {False: "", True: "/proxy/8090/"}[behind_proxy]
    
    logger.info(f"BEHIND_PROXY: {behind_proxy}")
    logger.info(f"URL_PREFIX: {prefix}")
    logger.info(f"Prefix: {prefix}, Path: {path}")
    path = path.lstrip('/')
    path = prefix + "/" + path.rstrip('/')
    path = path.replace('//', '/')
    print(f"Prefix: {prefix}, Final path: {path}")
    return path