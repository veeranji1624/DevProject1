import React from 'react'
import { Container } from 'reactstrap'

const Privacy = () => {
  window.scrollTo(0,0);
  return (
    <div>
      <div className="blue pt-3">
        <h1 className="white-text center bold p-5">Privacy Policy</h1>
      </div>
      <Container className="p-5" style={{ lineHeight: '30px', background: '#eee' }}>
        <h2 className="bold">Privacy statement</h2>
        <p><strong>Pion Global Private Limited</strong> considers your privacy a high priority. This privacy statement explains the information Pion Global Private Limited gathers from you from our web site and how we may use it. If you have any questions or concerns, please contact us via our "Contact us" page.</p>
  
        <p>Pion Global Private Limited receives names and email addresses only when personally submitted by users through our "Contact us" pages. Those screens allow users to ask specific questions of Pion Global Private Limited, request information about our services, offer feedback, comments, or suggestions about our services. Any such information submitted or otherwise obtained enables Pion Global Private Limited to respond to user inquiries and measure its Site users' needs, interests, and ideas for future Site development. Pion Global Private Limited respects the privacy of users visiting us at http://www.pionglobal.com and does not send unsolicited emails or any direct marketing materials. Pion Global Private Limited also does not provide your personal information to any third parties.</p>
  
        <h2 className="bold">Information Security</h2>
        <p>We protect the personal information you share with us. We store and process your personal data, such as the name, address, e-mail address, or telephone number, in accordance with general Data Protection Policy.  Access to your personal information is limited to those individuals within and working with Pion Global Private Limited who need it in order to do their job. You should be aware that we may be required to disclose your personal information in response to court orders, or legal process or to establish or exercise our legal rights or defend against legal claims. We may also collect and possibly share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, misappropriation or infringement of our intellectual property rights, defamation or damage to our reputation or goodwill, situations involving potential threats to the physical safety of any person, employees or as otherwise required by law.</p>
  
        <h2 className="bold">Children's Privacy</h2>
        <p>Pion Global Private Limited understands the importance of protecting children's privacy. This web site is not designed for or intentionally targeted to children 13 years of age or younger. It is not our policy or our intention to collect or maintain information about anyone under the age of 13.</p>
  
        <h2 className="bold">Linked Web Sites</h2>
        <p>From time to time we may provide links to third-party web sites. We do not regularly review and do not control or endorse the content or materials which may appear on these third-party sites, and we make no representations concerning and are not responsible for the accuracy, relevancy, copyright compliance, legality or decency of any material contained there. We encourage you to review the privacy policies and terms of use posted on, and applicable to, those sites. By clicking on the link to a third-party site, you acknowledge that Pion Global Private Limited is not responsible for the third-party sites or any materials therein contained. We reserve the right to terminate any links to third-party sites at any time, although we are under no obligation to do so.</p>
  
        <h2 className="bold">Cookies</h2>
        <p>Cookies are small pieces of data which are sent by a web site to your browser and are stored on your computer.  Our site uses first party cookies only, which are cookies that are set by the site itself and can only be read by this site.  They are used for the functionality of the site.  The data is not used for individual identification and Pion Global Private Limited in no way relates your personal information to this data.  Our website can be visited without registration and we do not collect any personal data (such as name, address, telephone number or e-mail address) from you, unless you provide it voluntarily through our "Contact us" page.  If you are concerned about the use of cookies, you may configure your web browser to either request your specific acceptance of a cookie or disable cookies entirely. You will still be able to fully navigate our web site if you choose to refuse or disable cookies.</p>
      </Container>
    </div>
  )
}
export default Privacy;