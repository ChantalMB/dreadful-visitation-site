import React from 'react';
import StreamChart from './components/StreamChart.js';
import PlagueMap from './components/PlagueMap.js';
import './css/App.css';
import dieaseTot from './causes-of-death.csv'
import plagueMapData from './play-data.geojson'
import burialMapData from './dup.geojson'
import weeklydisease from './weeklydisease.csv'
import FadeInSection from './components/fadeinSec.js';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import BurialMap from './components/BurialMap.js';
import BarChart from './components/BarChart.js';

const titlesTotals = require('./titles-totals.json');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  onSliderChange = value => {
    this.setState(
      {
        value
      },
      () => {
        console.log(this.state.value);
      }
    );
  };

  stateStream = {
    data: dieaseTot,
    width: 1100,
    height: 550,
    id: "root"
  }

  statePlague = {
    data: plagueMapData,
    width: 600,
    height: 625,
    id: "root"
  }

  stateBurial = {
    data: burialMapData,
    width: 600,
    height: 625,
    id: "root"
  }

  stateBar = {
    data: weeklydisease,
    width: 1100,
    height: 550,
    id: "root"
  }

  render() {
    return (
      <div className="App">

      <FadeInSection>

        <section id= 'intro'>
          <h1>MODERN OBSERVATIONS ON THE BILLS OF MORTALITY</h1>

          <blockquote>
          <p>&quot;<em>Consider His Mercy to Thee and Mee, that we are yet in the Land of the Living, to work out our Salvation with Fear and Trembling</em>&quot;</p>
          </blockquote>

          <iframe src="https://archive.org/embed/2378023r?ui=embed#page/n9/mode/2up" title="London's Dreadful Visitation" height="500" width="1100" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen=""></iframe>

          <div id = 'intro-text'>

          <p>With a title page framed by elaborate symbols of memento mori and a title that implies a devastating ordeal, the introductory message from which this quote derives from in <em>London&#39;s Dreadful Visitation</em> apologising for its publication due to its contents recounting the devastation the swept across London during that year, seems unsurprising.</p>
          <p>The introduction of this document was composed by its printer, E. Cotes, also known as Ellinor or Ellen Cotes, widow of the printing shop’s previous owner Richard Cotes. Like most printers in 1665, she functioned on a commission basis printing a variety of texts from <a href="https://quod.lib.umich.edu/e/eebo/A29556.0001.001?view=toc">fiction</a> to <a href="https://quod.lib.umich.edu/e/eebo2/A61915.0001.001?view=toc">textbooks</a>; yet unlike her other texts, printing <em>London&#39;s Dreadful Visitation, or, a Collection of All the Bills of Mortality for This Present Year</em> was a special privilege granted to her by the Company of Parish-Clerks. This group was composed of the parish clerks of London, who were in charge of registering those within the area of their assigned parish, as well as tracking the weekly burials and causes of death for their parish to be reported in the &#39;Bills of Mortality. These &#39;bills&#39; began to be published inconsistently during the late 16th century, featuring a list of all parishes in and surrounding the city of London at the given time; beside each parish,  there was a count stating the total number of burials that week and how many of those burials were due to a death caused by the plague provided by the appointed clerk of each parish. It was around 1629 when an additional page was attached to the bills, which featured categories of disease and the total count of those who died from the specified diseases across all parishes, which led to the finalized form of the bills found in <em>London&#39;s Dreadful Visitation</em>.</p>
          <p>In the 17th century printing was heavily controlled by the ruling monarchy in fear of the dissemination of negative press, but the work of the Company of Parish-Clerks was seen as a valuable service to the public, thus they were authorized to use the printing press. But the Company was afraid of defamation through misrepresentation much like the monarchy, so in hopes of avoiding this, the Cotes printing shop was given exclusive rights to printing the weekly Bills of Mortality; this way, it could always be known what weekly mortality data was considered official by looking at the printer, and the Company of Parish-Clerks could also refute any claims of inconsistent or incorrect data by noting the source from which the claim derived.</p>
          <p>What both stands out about this document and sets the stage for what is to follow, is the opening message written by Cotes, &quot;The Printer to the Reader&quot;, which is something not found in her other publications. The weekly bills compiled in this document were published primarily to inform Londoners about occurrences of disease and plague in their community, yet in her introduction, Cotes implores readers to repent so that they may be saved as the tragedy of the plague highlighted God&#39;s power. As Cotes was a layperson herself, this interpretation of the plague as an act of God rather than something purely medical within the context of numerous documents on disease gives one an idea of how contagion and infection may have been conceptualized by the greater public. How seriously the bills and their contents were treated speaks to a common belief in-- and fear of-- communicable disease, yet at the forefront of the cumulative text which features all diseases known to Londoners, rather than discussing how disease might be transmitted and how this could be prevented, the advice given is to repent for one’s sins in hopes that God will restore health to the city.</p>
          <p>By looking at more deeply at the contents of <em>London&#39;s Dreadful Visitation</em> using digital perspectives, we can learn more about how Cotes&#39;s views came to be as the movement of disease and people across London during the year of 1665 speak to the growing social change that was occurring in the city as plague overtook it. What made London a truly sinful city?</p>

          </div>

        </section>
      </FadeInSection>

      <section id='maps'>
        <PlagueMap data={this.statePlague.data} width={this.statePlague.width} height={this.statePlague.height} selector={this.state.value}/>
        <BurialMap data={this.stateBurial.data} width={this.stateBurial.width} height={this.stateBurial.height} selector={this.state.value}/>
      </section>

      <section id='slider'>
        <div style={{ marginLeft: 15, marginRight: 15 }}>{titlesTotals[this.state.value - 1].week_text}</div>
        <div style={{ marginLeft: 15, marginRight: 15, marginBottom: 25 }}>{"Plague Death Total: " + titlesTotals[this.state.value - 1].Plague}</div>
        <Slider
              id = 'weekData'
              min={1}
              max={52}
              value={this.state.value}
              step={1}
              marks={{1: '1',
                      2: '2',
                      3: '3',
                      4: '4',
                      5: '5',
                      6: '6',
                      7: '7',
                      8: '8',
                      9: '9',
                      10: '10',
                      11: '11',
                      12: '12',
                      13: '13',
                      14: '14',
                      15: '15',
                      16: '16',
                      17: '17',
                      18: '18',
                      19: '19',
                      20: '20',
                      21: '21',
                      22: '22',
                      23: '23',
                      24: '24',
                      25: '25',
                      26: '26',
                      27: '27',
                      28: '28',
                      29: '29',
                      30: '30',
                      31: '31',
                      32: '32',
                      33: '33',
                      34: '34',
                      35: '35',
                      36: '36',
                      37: '37',
                      38: '38',
                      39: '39',
                      40: '40',
                      41: '41',
                      42: '42',
                      43: '43',
                      44: '44',
                      45: '45',
                      46: '46',
                      47: '47',
                      48: '48',
                      49: '49',
                      50: '50',
                      51: '51',
                      52: '52'
              }}
              onChange={this.onSliderChange}
            />
      </section>

      <section id='barchart'>
        <BarChart data={this.stateBar.data} width={this.stateBar.width} height={this.stateBar.height} selector={this.state.value}/>
      </section>

      <section id='main'>
        <FadeInSection>
        <h2 id="counting-the-dead">Counting the Dead in Context</h2>
        <figure>
          <img id="searchersImg" src='../searchers-image.jpg' alt='searchers' />
          <figcaption><em>Broadsheet depicting the 1665 plague in London, the second image from the <br / > bottom shows a pair of searchers at work. Anonymous Plague Broadsheet <br / > (c. 1665). Pepys Library, Magdalene College, Cambridge (PL 2973/447).</em></figcaption>
        </figure>
        <h3 id="those-who-collected-the-data">Those Who Collected the Data</h3>
        <p>&#39;Searchers&#39; often received a bad reputation by the most significant thinkers of the 17th century; both John Graunt in his <em>Natural and Political Observations on the Bills of Mortality</em> on the year of 1662 and Thomas Dekker in previous plague years commented on the apparent ignorance and carelessness of searchers leading to the inaccuracies found in the weekly Bills of Mortality. These searchers discussed by both men were often poor, elderly women who were sent in pairs into the homes of the recently deceased members of their parish to diagnose the cause of death. These women were often forced into this line of work due to the idea that they were expendable, as they had nothing positive to give to their community-- widowed and left with no family to support them, they relied on a pension from the church to survive which they could lose should they refuse to work. In plague years, the role of searchers was especially significant as they had power over the decision of what caused death, and thus they were those who ultimately determined how their parish would be perceived across London based on the number of those that died from the plague.</p>
        <p>Despite the purpose of their role being the diagnosis of death, searchers had little to no medical training which is where much of the criticism of their reported totals lies. Yet this mistrust surrounding those who were searchers stemmed from more than just their uncertain medical knowledge; in his <em>Reflections on the Weekly Bills of Mortality for the Cities of London and Westminster</em>, John Graunt specifies that &quot;the poor Searchers, out of ignorance, respect, love of money, or malice misreported many deaths.&quot; As class was increasingly taking shape in 17th century London, the economic status of the searchers also became a testament to the validity of the numbers they provided. Since the women who were searchers were often poor, it was believed that they could easily be bribed by those with higher status to diagnose the deceased with a disease seen as more favourable than something like the plague. This idea was further built upon by common beliefs held by wealthier members of society that those who were poor were often lazy and prone to malice; thus, the work of the searchers was even more untrustworthy due to the notion that they may simply misdiagnose disease and alter death counts for no other reason than to damage the reputation of the parish they oversaw.</p>
        <p>This suspicion of a searcher&#39;s words also carried over into a suspicion of their very presence. Moving in and out of the homes of the sick resulted in they themselves being treated as a disease, capable of harbouring and spreading the plague wherever they went. Thus, during times of plague outbreak, searchers were required to mark themselves as contaminated by carrying red wands or walking sticks; searchers were also told to move by means of parish alleyways where they were less likely to interact with members of the community and to avoid gathering with others, although this was a simple demand to meet considering that they were typically isolated and shunned by their community. With this combination of official mandates and social stigma surrounding poverty and disease, the searcher was not a person simply excluded from her parish community but marginalized within it.</p>
        </FadeInSection>

        <FadeInSection>
        <h3 id="those-who-compiled-the-data">Those Who Compiled the Data</h3>
        <p>The next step within the process of creating the Bills of Mortality compiled in <em>London&#39;s Dreadful Visitation</em> was done by the parish clerks, as mentioned previously. Although those who were appointed to the role of parish clerk were typically respected members of the community, they were also the point at which data was skewed with intention. Despite searchers being untrained in formal medicine, they often did take their role seriously in attempting to determine accurate causes of death. If it was discovered that they accepted a bribed to misattribute a cause of death, they risked having their entire pension taken away from them, so, despite the popular notion that they were prone to bribery and laziness, the risk of extortion often outweighed the benefits of it. Yet the preconceived notions about poor individuals and the knowledge that they were the first step in collecting the mortality data within their community left them easy to place blame upon, which the social status of the parish clerks protected against.</p>
        <p>The preserved diaries of those with some status are rather telling of how the collected numbers were altered not by those collecting them, but by those compiling them. In the journal of naval administrator Samuel Pepys, he recalls a time where he went to visit his parish&#39;s clerk in an effort to acquire information about the plague in advance of the weekly bill being published; the clerk responded to his inquiry with &#39;there died nine this week, though I have returned but six.&#39; Often through bribery from a wealthy family or as a favour to them to increase his social mobility and status, a parish clerk would mark in his notes that the deceased of these families should be buried in the churchyard or area designated for non-plague burials. Doing so allowed for these families to have a normal funeral procession and also freed them from the stigma and mandatory quarantine that came attached to deaths of family members caused by the plague.</p>
        <p>When compiling the weekly totals for the Bills of Mortality, a parish clerk also took into consideration how the causes of mortality reflected how the rest of London viewed their parish. Parishes with a population that contained a larger number of London&#39;s elite often wanted to maintain their status of wealth and prosperity, and because disease and outbreaks tended to be associated with uncleanliness and poverty, the plague totals may be altered and the deaths redistributed to other causes prior to being publically distributed. This way, their parish may be perceived as less affected and thus safer and more reputable, but also draw attention to the more impoverished parishes with higher totals, distracting from the numbers which they had altered.</p>
        </FadeInSection>

        <FadeInSection>
        <h2 id="so-how-does-this-affect-what-we-see-">So how does this affect what we see?</h2>
        </FadeInSection>

        <FadeInSection>
        <h3 id="spatial-aspects-of-disease">Spatial Considerations</h3>
        <p>To situate the influence of disease in 1665 London, it is key to observe first how the city was divided. At the document level, we can find this information by looking at how the page of burials by parish is laid out. First, the central parishes within the city of London&#39;s walls are listed, then separated from this are the parishes outside the walls along with the parishes of Westminister and the city suburbs of Middlesex and Surrey. The outer parishes divided from those of the city were typically composed of working-class individuals who were pushed out of the more affluent areas of central London, and thus these rapidly growing areas became associated with crime and disease. This identity was further exacerbated by systems of public charity and relief within London&#39;s parishes, as the parishes within the walls maintained a well-organized exchanged between rich and poor parishes, while these newly establishing outer parishes relied only on their own, few resources, leading to a much lower standard of living.</p>
        <p>Thus, the combination of living conditions found in these less wealthy areas coupled with the deceptive reporting of mortality by a number of parish clerks led to the first cases of the plague appearing in the section of the Bills set aside for the parishes along the outer walls of London, which is also reflected in the map visualising this data above. This geographic and social boundary enforced by how the Bills of Mortality were laid out served as assurance for many members of upper society situated in central London when the plague first broke out, as it created a degree of distance between their home and the terror which lingered outside of its walls.</p>
        </FadeInSection>


        <FadeInSection>
        <div id='streamchart'>
          <StreamChart data={this.stateStream.data} width={this.stateStream.width} height={this.stateStream.height}/>
        </div>

        <h3 id="disease-deception">The Class of Disease</h3>
        <p>With all this context regarding the formation of the Bills and how they shaped individuals perceptions of the metropolitan area in which they lived, the question remains, why was one dying from the plague so significant? The misdiagnoses and alteration of the reported causes of mortality and their totals map the maps displayed on this page more of a reflection on social politics than accurate statistics of death and disease. As stated, disease outbreaks were often associated with the poor and unclean, and by looking at the maps, this concept seems to hold true. There consistently remains a larger number of general burials in the poorer parishes outside the walls of central London throughout the year, and when setting the slider at position 1 to look at the very first week covered by <em>London&#39;s Dreadful Visitation</em>, one can see the there is, in fact, a single case of the plague in the majority working-class and impoverished parish of St Giles in the Fields. The plague then continues to disappear and reappear from the map in the same location up until the 20th week, May 2 to the 9th, when the plague begins to spread to the parishes east of St Giles in the Fields. Despite common belief that the bubonic plague was often imported into London due to the significance of its many dockyards along the Thames, yet since the 1665 plague outbreak had seemingly begun in a parish located away from any sites of importation, this indicated that it derived from disease that had already been living in London, but lying dormant until the perfect conditions for it to spread developed.</p>
        <p>This pattern of development reinforced the notion for those of status or who sought higher status that plague was in fact, a symptom of poverty, thus the plague gained a stigma for marking one as lesser-- meaning that everything possible was done to avoid this label. The most popular strategy among the elite to avoid becoming a plague victim at all was to flee the city should they have the means to do so. The wealthiest had additional properties in the more rural outer parishes that they would move to during times of increased plague mortality in the parish of their primary residences. This movement from in and out of the central walls of London is visible; beginning in week 25 when plague mortality begins its increase centrally, as you move the slider forward in time you can see the decrease of plague mortality centrally but a contrasting jump in plague mortality in the outer parishes where the wealthy fled to and took plague with them. By week 40, there is a slight decrease in plague mortality within the outer parishes yet an increase within the parishes of central London, likely caused by yet another attempt by the elite to escape the ever-moving disease.</p>
        <p>Scrolling through these weeks on the map, the totals of other causes of mortality can be noted on the associated bar chart below the slider. There are consistently a significant amount of individuals who passed away from consumption and fever, yet by looking at the stream graph which shows an overview of these other diseases that resulted in mortality throughout the entire year of 1665, as the number of deaths by plague increased, so did the number of deaths caused by other diseases. When looking at the source document itself, in the spring months when the plague had just begun appearing in a capacity beyond zero in the bills, the list of other possible causes of death grew. Between the 31st and 42nd week of the year, as the stream graph indicates there is a marked jump in the casualties caused by fever, spotted fever, and consumption. Spotted fever was occasionally noted as being difficult to distinguish from earlier stages of the plague, and fever could simply be a symptom of the plague, so although these marked surges could simply be misdiagnosed by searchers, they may also represent the redistribution and concealment of plague deaths that the wealth requested from their parish clerks to maintain their status, avoiding the negative reputation that they could garner should others know that the plague had affected their household.</p>
        </FadeInSection>
        </section>

        <section id='bib'>
        <h2 id="acknowledgements-bibliography">Acknowledgements &amp; Bibliography</h2>

        <p>I would like to express my deepest gratitude to Dr. Justin Colson from the University of Essex for aiding me in my pursuit of parish map data, as well as sharing additional resources I would have likely not found on my own.</p>
        <p>I would also like to thank Dr. Matthew Davies and Dr Stephen Gadd from the <a href="https://www.layersoflondon.org/"><em>Layers of London</em> project</a> who generously shared the various shapefiles needed to create the map I made for this site representing 1665 London.</p>
        <p>Finally, I, of course, would like to thank my professor for the course which this project was made for, Dr. Lori Jones, for her extensive feedback and excellent teaching throughout this semester that allowed this project to take its final form.</p>

        <h3>Data</em></h3>

        <p><b>Note:</b> All data and notes on data processing for this project can be located <a href="https://github.com/ChantalMB/HIST3907-dreadful-visitation">here</a>, and the repository for this website is <a href="https://github.com/ChantalMB/dreadful-visitation-site">here</a>.</p>

        <p>Burton, N., Southall, H. R. <em>GIS of the Ancient Parishes of England and Wales, 1500-1850.</em> [data collection]. UK Data Service, 2004 [Accessed 28 April 2021]. Available from: http://doi.org/10.5255/UKDA-SN-4828-1</p>

        <h3>Primary Sources</h3>

        <p>Graunt, John. <em>Natural and Political Observations, Mentioned in a Following Index, and made upon the Bills of Mortality.</em> London: John Martyn, 1662.</p>

        <p>Graunt, John. <em>Reflections On the Weekly Bills of Mortality for the Cities of London and Westminster, and the Places Adjacent: But More Especially, So Far As it Relates to the Plague and Other Most Mortal Diseases That We English-Men Are Most Subject To, and Should Be Most Careful Against In This Our Age</em>. London: the Rainbow, 1665.</p>

        <p>Pepys, Samuel. <em>The Diary of Samuel Pepys</em>. Vol. 1: 1660. Ed. Robert Latham and William Matthews. London: Harper Collins; University of California Press, 1971.</p>

        <p class="p1">The Company of Parish-Clerks of London. <em>London&apos;s dreadful visitation, or, A collection of all the bills of mortality for this present year beginning the 20th of December, 1664, and ending the 19th of December following.</em> London: E. Cotes, 1665.<span class="Apple-converted-space">&nbsp;</span></p>

        <h3>Secondary Sources</h3>

        <p class="p1">Bainbridge, Mark. &ldquo;Memento Mori: London&rsquo;s Dreadful Visitation.&rdquo; Treasures of Worcester College, University of Oxford: Worcester College Library and Archives, 2017. https://worcestercollegelibrary.wordpress.com/2017/10/31/memento-mori-londons-dreadful-visitation.</p>

        <p class="p1">Boulton, Jeremy. <em>Neighbourhood and Society: A London Suburb in the Seventeenth Century</em>. Cambridge: Cambridge University Press, 2005.</p>

        <p class="p1">Boyce, Niall. &ldquo;Bills of Mortality: tracking disease in early modern London.&rdquo; <em>The Lancet&nbsp;</em>395, no. 10231 (2020): 1186-1187.</p>

        <p class="p1">Cummins, Neil, Morgan Kelly, and Cormac &Oacute; Gr&aacute;da. &ldquo;Living Standards and Plague in London, 1560-1665.&rdquo; <em>Economic History Review</em> 69, no. 1 (February 2016): 3&ndash;34. doi:10.1111/ehr.12098.</p>

        <p class="p1">Gilman, Ernest B. <em>Plague Writing in Early Modern England.</em> Chicago: University of Chicago Press, 2009.</p>

        <p class="p1">Greenberg, Stephen. &quot;Plague, the Printing Press, and Public Health in Seventeenth-Century London.&quot; <em>The Huntington Library Quarterly</em> 67, no. 4 (2004): 508-527, 691.</p>

        <p>Griffiths, Paul.&nbsp;<em>Lost Londons : Change, Crime, and Control in the Capital City, 1550&ndash;1660</em>. Cambridge: Cambridge University Press, 2008.</p>

        <p>Mazur, Dennis J. &ldquo;Analyzing and Interpreting &lsquo;Imperfect&rsquo; Big Data in the 1600s.&rdquo; <em>Big Data &amp; Society</em>, (June 2016). https://doi.org/10.1177/2053951715609082.</p>

        <p>Munkhoff, Richelle "Searchers of the dead: authority, marginality, and the interpretation of plague in England, 1574-1665." <em>Gender &amp; History</em> 11, no. 1&nbsp;(1999):1-29.</p>

        <p class="p1">Slauter, Will. &ldquo;Write up Your Dead: The bills of mortality and the London plague of 1665.&rdquo; <em>Media History</em> 17, no. 1 (February 2011): 1&ndash;15. doi:10.1080/13688804.2011.532371.</p>

        <p class="p1">Wear, Andrew. &ldquo;Making us as cruel as dogs: plague in 16th and 17th century England.&rdquo; <em>The Lancet</em> 385, no. 9986, (2015): 2456-2457.</p>


        </section>
        
      </div>
    );
  }
}

export default App;
