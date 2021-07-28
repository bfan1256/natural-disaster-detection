import uuid
import os
import json
from flask import Flask, request, jsonify, Response
from es_functions import SearchES

APP = Flask(__name__)
print('Initializing Elastic Search Class')
ELASTICSEARCH = SearchES()


@APP.route('/search')
def search_db():
    """Route to search for phrase or term in database

    Takes `term` parameter from /search route, and utilizes ElasticSearch to
    to search tweet database for associated tweet data

    Returns:
        (dict): response dictionary of requested data
        response is below::

            {
                'result': (list),
                'term': (str),
                'search_id': (str),
                'url': (str)
            }

    """
    search_id = str(uuid.uuid4())
    response = {'search_id': search_id, 'url': request.url}
    term = request.args.get('term')
    try:
        sort_type = request.args.get('sort_type')
    except Exception:
        sort_type = 'relevant'
    response['term'] = term
    results = ELASTICSEARCH.search(term, sort_type)
    response['result'] = results
    resp = Response(json.dumps(response), status=200,
                    mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@APP.route('/tweets')
def search_tweets():
    """Route to search for tweets based on topic

    Takes `term` parameter from /search route, and utilizes ElasticSearch to
    to search tweet database for associated tweet data

    Returns:
        (dict): response dictionary of requested data
        response is below::

            {
                'result': (list),
                'topic': (str),
                'search_id': (str),
                'url': (str)
            }

    """
    search_id = str(uuid.uuid4())
    response = {'search_id': search_id, 'url': request.url}
    topic = request.args.get('topic')
    try:
        sort_type = request.args.get('sort_type')
    except Exception:
        sort_type = 'relevant'
    response['topic'] = topic
    results = ELASTICSEARCH.search_by_topic(topic)
    response['result'] = results
    resp = Response(json.dumps(response), status=200,
                    mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@APP.route('/event')
def get_event():
    search_id = str(uuid.uuid4())
    response = {'search_id': search_id, 'url': request.url}
    topic = request.args.get('topic')
    response['topic'] = topic
    result = [ELASTICSEARCH.get_event(topic)]
    response['result'] = result
    resp = Response(json.dumps(response), status=200,
                    mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@APP.route('/events')
def get_all_events():
    search_id = str(uuid.uuid4())
    response = {'search_id': search_id, 'url': request.url}
    result = ELASTICSEARCH.get_all_events()
    response['result'] = result
    resp = Response(json.dumps(response), status=200,
                    mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == '__main__':
    print('Initializing Server...')
    PORT = int(os.environ.get("PORT", 5000))
    APP.run(host='0.0.0.0', port=PORT)
