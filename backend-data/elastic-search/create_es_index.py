# -*- coding: utf-8 -*-
"""Script to create index of natural disaster database for ElasticSearch

Authors: Brandon Fan
Last Edit Date: 2/29/2020
"""

import json
from elasticsearch import Elasticsearch


def create_index():
    """creates index of bible verses for elasticsearch"""
    es = Elasticsearch()
    if es.indices.exists(index='natural-disaster-tweets-index'):
        es.indices.delete(index='natural-disaster-tweets-index')
    if es.indices.exists(index='natural-disaster-index'):
        es.indices.delete(index='natural-disaster-index')
    if es.indices.exists(index='natural-disaster-events-index'):
        es.indices.delete(index='natural-disaster-events-index')
    with open('../elastic-search-data/search_data.json') as f:
        search_data = json.load(f)
        for tweet in search_data:
            es.index(index='natural-disaster-tweets-index', doc_type='tweet', body=tweet)
    
    with open('../elastic-search-data/new_events.json') as f:
        events = json.load(f)
        for event in events:
            es.index(index='natural-disaster-events-index', doc_type='event', body=event)

if __name__ == '__main__':
    create_index()
