import algoliasearch from "algoliasearch/lite";
import VueMomentsAgo from "vue-moments-ago";
import AppInfiniteHits from "./loop-scroll";
import "instantsearch.css/themes/algolia-min.css";

Vue.component("home", {
  props: ["user"],
  mounted() {
    //
  },
  data() {
    return {
      searchClient: algoliasearch(
        "190229ZBIS",
        "ca76d001d309f417d0f6e99a8c141edf",
      ),
    };
  },
  components: {
    VueMomentsAgo,
    AppInfiniteHits,
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

        <app-infinite-hits>
            <article class="article article-style-c" slot="item" slot-scope="{ item }">
                <div class="article-details">
                    <div class="article-user">
                        <img alt="image" :src="'https://media.poweradspy.com/' + item.post_owner_image.replace('https://media.poweradspy.com/', '')">
                        <div class="article-user-details">
                            <div class="user-detail-name">
                                <a href="#">{{item.post_owner}}</a>
                            </div>
                            <div class="text-job">
                                <vue-moments-ago prefix="posted" suffix="ago" :date="item.post_date"></vue-moments-ago>
                            </div>
                        </div>
                    </div>
                    <div class="article-title">
                        <h2 :class="[item.ad_title && item.ad_title.length > 50 ? 'title-read-more' : '', 'title-' + item.id]" @click="$event.target.classList.toggle('title-read-less')" title="Click to Read More"><a :href="item.ad_url" target="_blank">{{item.ad_title}}</a></h2>
                    </div>
                </div>
                <div class="article-header">
                    <div class="article-image">
                        <picture v-if="item.ad_type === 'IMAGE'">
                            <img :src="'https://media.poweradspy.com/' + item.image_video_url.replace('https://media.poweradspy.com/', '')" :alt="item.ad_title" style="width: 100%;">
                        </picture>
                        <embed v-if="item.ad_type === 'VIDEO'" type="video/webm" :src="'https://media.poweradspy.com/' + item.image_video_url.replace('https://media.poweradspy.com/', '')" width="100%" height="100%" />
                    </div>
                </div>
                <div class="article-content">
                    <p v-bind:class="[item.ad_text && item.ad_text.length > 50 ? 'read-more' : '', 'text-body-' + item.id]" @click="$event.target.classList.toggle('read-less')" title="Click to Read More">{{item.ad_text}}</p>
                </div>
                <div class="article-social">
                    <div class="like">
                        <a href="#">
                            <i class="fa fa-thumbs-up"></i>
                            <p>Like {{item.likes}}</p>
                        </a>
                    </div>

                    <div class="comment">
                        <a href="#">
                            <i class="fa fa-commenting"></i>
                            <p>Comment {{item.comment}}</p>
                        </a>
                    </div>

                    <div class="share">
                        <a href="#">
                            <i class="fa fa-share"></i>
                            <p>Share {{item.share}}</p>
                        </a>
                    </div>
                </div>
            </article>
        </app-infinite-hits>
    </ais-instant-search>
`,
});
