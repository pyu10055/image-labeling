import {HttpClient, HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import * as tfc from '@tensorflow/tfjs-core';
import {environment} from '../../environments/environment';
import {MobileNet} from './mobilenet';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {
  private endpoint = 'https://www.googleapis.com';
  private apiKey = environment['GOOGLE_API_KEY'];
  private id = '014556644131298163303:nri_-hkpokw';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'q=0.8;application/json;q=0.9'
  });
  private mobileNet: MobileNet;
  private results: any;

  constructor(private httpClient: HttpClient) {}

  async ngOnInit() {
    this.mobileNet = new MobileNet();
    await this.mobileNet.load();
  }

  search(query, options) {
    const url = `${this.endpoint}/customsearch/v1`;
    this.httpClient.get(url, {params: this.buildQuery(query, options)})
        .subscribe((next: any) => {
          this.results = next.items;
          console.log(this.results);
        });
  }

  hideImage(event) {
    event.target.parentElement.parentElement.parentElement.style['display'] =
        'none';
  }

  predict(id, event) {
    event.target.parentElement.style['display'] = 'block';
    const image = document.getElementById(id) as HTMLImageElement;
    image.crossOrigin = '';
    const pixels = tfc.fromPixels(image);
    const result = this.mobileNet.predict(pixels);
    const topK = this.mobileNet.getTopKClasses(result, 5);
    this.results[id]['topK'] = topK;
  }

  private buildQuery(query, options): HttpParams {
    options = options || {};
    const params = new HttpParams({
      fromObject: {
        q: query.replace(/\s/g, '+'),
        searchType: 'image',
        cx: this.id,
        key: this.apiKey
      }
    });

    if (options.page) {
      params.set('start', options.page);
    }

    if (options.size) {
      params.set('imgSize', options.size);
    }

    if (options.type) {
      params.set('imgType', options.type);
    }

    return params;
  }
}
