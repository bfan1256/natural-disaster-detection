import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }


  processDate(dateString: string) {
    const splitString = dateString.split(' ')
    return `${splitString[0]}, ${splitString[1]} ${splitString[2]}, ${splitString[splitString.length - 1]}`;
  }

  isPriority(priority: string, priorityComparison: string) {
    return priority.toLowerCase() === priorityComparison;
  }

  processText(text: string) {
    return text.replace(/â€™/g, '\'');
  }

  checkIrrelevancy(labels) {
    const lowerCaseLabels = labels.map(label => label.toLowerCase());
    return lowerCaseLabels.indexOf('irrelevant') !== -1;
  }

  splitCategories(category: string) {
    category = category.toLowerCase();
    let finalCategory = '';
    switch (category) {
      case 'thirdpartyobservation': {
        finalCategory = 'Third Party Observation';
        break;
      }
      case 'multimediashare': {
        finalCategory = 'Multimedia Share';
        break;
      }
      case 'knownalready': {
        finalCategory = 'Known Already';
        break;
      }
      case 'firstpartyobservation': {
        finalCategory = 'First Party Observation';
        break;
      }
      case 'continuingnews': {
        finalCategory = 'Continuing News';
        break;
      }
      case 'emergingthreats': {
        finalCategory = 'Emerging Threats';
        break;
      }
      case 'movepeople': {
        finalCategory = 'Move People';
        break;
      }
      case 'pastnews': {
        finalCategory = 'Past News';
        break;
      }
      case 'serviceavailable': {
        finalCategory = 'Service Available';
        break;
      }

      default: {
        finalCategory = category;
      }
    }
    return finalCategory;

  }

}
