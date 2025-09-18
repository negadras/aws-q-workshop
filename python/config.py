# config.py
from dataclasses import dataclass
from typing import Optional
import os
import logging


@dataclass
class Config:
    """Base configuration class for the application."""
    DEBUG: bool = True
    TESTING: bool = False
    PORT: int = os.getenv("PORT", 8090)
    # Game settings
    MAX_ATTEMPTS: int = 6
    WORD_LENGTH: int = 5

    # Logging
    LOG_LEVEL: str = os.environ.get('LOG_LEVEL', 'INFO')
    LOG_FORMAT: str = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    BEHIND_PROXY: bool = os.getenv('BEHIND_PROXY', 'true') == 'true'    
    
    def __init__(self):
        logging.basicConfig(level=self.LOG_LEVEL, format=self.LOG_FORMAT)
        self.logger = logging.getLogger(__name__)
        """Initialize the configuration."""
        self.logger.info(os.environ)
        self.logger.info(f"Config initialized: {self.__dict__}")
        # log the BEHIND_PROXY value
        self.logger.info(f"BEHIND_PROXY: {self.BEHIND_PROXY}")
