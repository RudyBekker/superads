import { ref } from "vue";
import algoliasearch from "algoliasearch/lite";
import VueMomentsAgo from "vue-moments-ago";
import AppInfiniteHits from "./loop-scroll";
import SkeletonLoading from "./skeleton-loading";
import "instantsearch.css/themes/algolia-min.css";

Vue.component("home", {
  props: ["user"],
  mounted() {
    setTimeout(() => {
      this.loopData = true;
    }, 5000);
  },
  data() {
    return {
      searchClient: algoliasearch(
        "190229ZBIS",
        "ca76d001d309f417d0f6e99a8c141edf"
      ),
      loopData: false,
    };
  },
  components: {
    VueMomentsAgo,
    AppInfiniteHits,
    SkeletonLoading,
  },
  template: `
    <ais-instant-search :search-client="searchClient" index-name="fbads1">
        <ais-search-box class="py-3" />

        <ais-sort-by
            class="py-3"
            :items="[
                { value: 'fbads1', label: 'Normal' },
                { value: 'likes_asc', label: 'Likes asc.' },
                { value: 'likes_dsc', label: 'Likes desc.' },
                { value: 'comment_asc', label: 'Comment asc.' },
                { value: 'comment_dsc', label: 'Comment desc.' },
                { value: 'share_asc', label: 'Share asc.' },
                { value: 'share_dsc', label: 'Share desc.' },
            ]"
        />

        <app-infinite-hits v-if="loopData">
            <div class="border border-gray-300 shadow-lg rounded-md max-w-sm w-full mx-auto bg-white" slot="item" slot-scope="{ item }">
                <picture class="lg:h-48 md:h-36 w-full object-cover object-center" v-if="item.ad_type === 'IMAGE'">
                    <img :src="'https://media.poweradspy.com/' + item.image_video_url.replace('https://media.poweradspy.com/', '')" :alt="item.ad_title" style="width: 100%;">
                </picture>
                <embed v-if="item.ad_type === 'VIDEO'" class="lg:h-48 md:h-36 w-full object-cover object-center" type="video/webm" :src="'https://media.poweradspy.com/' + item.image_video_url.replace('https://media.poweradspy.com/', '')" width="100%" height="100%" />
                <div class="flex space-x-4 pl-4 pr-4 pt-4">
                    <img alt="image" class="rounded-full h-12 w-12" :src="'https://media.poweradspy.com/' + item.post_owner_image.replace('https://media.poweradspy.com/', '')">
                    <div class="flex-1 space-y-1 py-1">
                        <div class="h-4 rounded">{{item.post_owner}}</div>
                        <div class="space-y-2">
                            <div class="h-4 rounded">
                                <vue-moments-ago prefix="posted" suffix="ago" :date="item.post_date"></vue-moments-ago>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <h1 :class="[item.ad_title && item.ad_title.length > 10 ? 'title-read-more' : '', 'title-font', 'text-lg', 'font-medium', 'text-gray-900', 'mb-3']" @click="$event.target.classList.toggle('title-read-less')" title="Click to Read More">
                        {{item.ad_title}}
                    </h1>
                    <p :class="[item.ad_text && item.ad_text.length > 10 ? 'title-read-more' : '', 'leading-relaxed', 'mb-3']" @click="$event.target.classList.toggle('title-read-less')" title="Click to Read More">
                        {{item.ad_text}}
                    </p>
                    <div class="flex items-center flex-wrap">
                        <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 w-full" :href="item.ad_url">Learn More
                            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <span class="text-gray-600 mr-1 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm px-2 py-1 border-r-2 border-gray-300">
                            <i class="fa fa-heart-o mr-1"></i>{{item.likes}}
                        </span>
                        <span class="text-gray-600 mr-1 inline-flex items-center leading-none text-sm px-2 py-1 border-r-2 border-gray-300">
                            <i class="fa fa-comment-o mr-1"></i>{{item.comment}}
                        </span>
                        <span class="text-gray-600 inline-flex items-center leading-none text-sm px-2">
                            <i class="fa fa-share-alt mr-1"></i>{{item.share}}
                        </span>
                    </div>
                </div>
            </div>
        </app-infinite-hits>
        <SkeletonLoading v-else />
    </ais-instant-search>
`,
});
