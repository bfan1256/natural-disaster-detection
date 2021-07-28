# -*- coding: utf-8 -*-
"""SearchES Class to handle searching with ElasticSearch

Authors: Brandon Fan
Last Edit Date: 1/15/2018
"""

import json
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from elasticsearch_dsl.query import Q
from fuzzywuzzy import fuzz
import re


class SearchES(object):
    """Class to search using ElasticSearch"
    Attributes:
        client (ElasticSearch): ElasticSearch client object.
    """

    def __init__(self):
        """initializes elasticsearch instance (note: must have ES instance running on localhost:9200)"""
        self.client = Elasticsearch()

    def search(self, term, sort_type='relevant'):

        search_query = Search(using=self.client, index='natural-disaster-tweets-index')
        query_string = Q(
            'query_string', query=term)
        response = search_query.query(query_string).highlight('text', 'label', 'topic')[0:200].execute()

        final_response = []
        for hit in response.hits.hits:
            data = hit['_source'].to_dict()
            try:
                data['text'] = hit['highlight']['name'][0]
            except KeyError:
                pass

            try:
                data['label'] = hit['highlight']['description'][0]
            except KeyError:
                pass
            try:
                data['topic'] = list(hit['highlight']['generic_names'])
            except KeyError:
                pass
            data['score'] = str(hit['_score'])
            final_response.append(data)
        return final_response
        
    def search_by_topic(self, topic):
        search_query = Search(using=self.client, index='natural-disaster-tweets-index')
        query_string = Q(
            'match', topic=topic)
        response = search_query.query(query_string)[0:200].execute()

        final_response = []
        for hit in response.hits.hits:
            data = hit['_source'].to_dict()
            data['score'] = str(hit['_score'])
            final_response.append(data)
        return final_response
    def get_all_events(self): 
        search_event = Search(using=self.client, index='natural-disaster-events-index')
        query_string = Q(
            'query_string', query='*')
        response = search_event.query(query_string)[0:100].execute()

        final_response = []
        for hit in response.hits.hits:
            data = hit['_source'].to_dict()
            data['score'] = str(hit['_score'])
            final_response.append(data)
        return final_response

        
    def get_event(self, event):

        search_events = Search(using=self.client, index='natural-disaster-events-index')
        query_string = Q(
            'match', dataset=event)
        response = search_events.query(query_string)[0:1].execute()

        final_response = []
        for hit in response.hits.hits:
            data = hit['_source'].to_dict()
            data['score'] = str(hit['_score'])
            final_response.append(data)
        return final_response[0]


if __name__ == '__main__':
    TEST_SEARCH = SearchES()
    TEST_RESPONSE = TEST_SEARCH.search('flood')
    assert len(TEST_RESPONSE) == 200
    TEST_EVENTS = TEST_SEARCH.get_all_events()
    assert len(TEST_EVENTS) == 18

    TEST_EVENT = TEST_SEARCH.get_event('floodChoco2019')
    assert type(TEST_EVENT) == dict
    print('All Tests Passed...')
