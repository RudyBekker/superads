import algoliasearch from "algoliasearch/lite";
import VueMomentsAgo from "vue-moments-ago";
import "instantsearch.css/themes/algolia-min.css";

Vue.component("home", {
  data() {
    return {
      searchClient: algoliasearch(
        "190229ZBIS",
        "ca76d001d309f417d0f6e99a8c141edf"
      ),
    };
  },
  components: {
    VueMomentsAgo,
  },
  props: ["user"],
  template: `
    <ais-instant-search :search-client="searchClient" index-name="fbads1">
        <ais-search-box class="py-3" />
        <ais-hits>
            <article class="article article-style-c" slot="item" slot-scope="{ item }">
                <div class="article-details">
                    <div class="article-user">
                        <img alt="image" :src="'https://media.poweradspy.com/' + item.post_owner_image">
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
                        <h2><a :href="item.ad_url" target="_blank">{{item.ad_title}}</a></h2>
                    </div>
                </div>
                <div class="article-header">
                    <div class="article-image">
                        <video controls style="width: 100%;" :poster="'https://media.poweradspy.com/' + item.image_video_url">
                            <source :src="'https://media.poweradspy.com/' + item.image_video_url">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div class="article-content">
                    <p>{{item.ad_text}}</p>
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
        </ais-hits>
        <ais-pagination />
    </ais-instant-search>
`,
  mounted() {
    //
  },
});
