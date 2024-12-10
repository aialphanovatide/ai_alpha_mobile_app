import React from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import usePrivacyPolicyStyles from './PrivacyPolicyStyles';
import BackButton from '../../../BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundGradient from '../../../BackgroundGradient/BackgroundGradient';
import Config from 'react-native-config';

// Component used in the Account section to show the Privacy Policy. It returns a view with the Privacy Policy text. The user can scroll through the text.

const PrivacyPolicy = () => {
  const styles = usePrivacyPolicyStyles();
  return (
    <SafeAreaView style={[styles.mainView, styles.paddingV]}>
      <BackgroundGradient />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}>
        <BackButton />
        <Text style={styles.title}>AI ALPHA'S PRIVACY POLICY</Text>
        <View style={styles.container}>
          <Text style={styles.privacyPolicyText}>
            before- {$MYFIRSTENV_TEST} -after
          </Text>
          <Text style={styles.privacyPolicyText}>
            {'\n\n'}
            Last updated January 21, 2024
            {'\n\n'}
            This privacy notice for Novatide Limited (doing business as AI
            Alpha) ('we', 'us', or 'our'), describes how and why we might
            collect, store, use, and/or share ('process') your information when
            you use our services ('Services'), such as when you:
            {'\n\n'}- Download and use our mobile application (AI Alpha), or any
            other application of ours that links to this privacy notice
            {'\n\n'}- Engage with us in other related ways, including any sales,
            marketing, or events
            {'\n\n'}
            Questions or concerns? Reading this privacy notice will help you
            understand your privacy rights and choices. If you do not agree with
            our policies and practices, please do not use our Services. If you
            still have any questions or concerns, please contact us at
            a.anand@novatidelabs.com.
            {'\n\n'}
            <Text style={styles.boldSection}>SUMMARY OF KEY POINTS</Text>
            {'\n\n'}
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our table of contents
            below to find the section you are looking for.
            {'\n\n'}
            What personal information do we process? When you visit, use, or
            navigate our Services, we may process personal information depending
            on how you interact with us and the Services, the choices you make,
            and the products and features you use. Learn more about personal
            information you disclose to us.
            {'\n\n'}
            Do we process any sensitive personal information? We do not process
            sensitive personal information.
            {'\n\n'}
            Do we receive any information from third parties? We do not receive
            any information from third parties.
            {'\n\n'}
            How do we process your information? We process your information to
            provide, improve, and administer our Services, communicate with you,
            for security and fraud prevention, and to comply with law. We may
            also process your information for other purposes with your consent.
            We process your information only when we have a valid legal reason
            to do so. Learn more about how we process your information.
            {'\n\n'}
            In what situations and with which parties do we share personal
            information? We may share information in specific situations and
            with specific third parties. Learn more about when and with whom we
            share your personal information.
            {'\n\n'}
            How do we keep your information safe? We have organisational and
            technical processes and procedures in place to protect your personal
            information. However, no electronic transmission over the internet
            or information storage technology can be guaranteed to be 100%
            secure, so we cannot promise or guarantee that hackers,
            cybercriminals, or other unauthorised third parties will not be able
            to defeat our security and improperly collect, access, steal, or
            modify your information. Learn more about how we keep your
            information safe.
            {'\n\n'}
            What are your rights? Depending on where you are located
            geographically, the applicable privacy law may mean you have certain
            rights regarding your personal information. Learn more about your
            privacy rights.
            {'\n\n'}
            How do you exercise your rights? The easiest way to exercise your
            rights is by submitting a data subject access request, or by
            contacting us. We will consider and act upon any request in
            accordance with applicable data protection laws.
            {'\n\n'}
            Want to learn more about what we do with any information we collect?
            Review the privacy notice in full.
            {'\n\n'}
            {'\n\n'}
            <Text style={styles.boldSection}>TABLE OF CONTENTS</Text>
            {'\n\n'}
            {'\n\n'}
            1. WHAT INFORMATION DO WE COLLECT?
            {'\n\n'}
            2. HOW DO WE PROCESS YOUR INFORMATION?
            {'\n\n'}
            3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
            INFORMATION?
            {'\n\n'}
            4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            {'\n\n'}
            5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            {'\n\n'}
            6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            {'\n\n'}
            7. HOW LONG DO WE KEEP YOUR INFORMATION?
            {'\n\n'}
            8. HOW DO WE KEEP YOUR INFORMATION SAFE?
            {'\n\n'}
            9. DO WE COLLECT INFORMATION FROM MINORS?
            {'\n\n'}
            10. WHAT ARE YOUR PRIVACY RIGHTS?
            {'\n\n'}
            11. CONTROLS FOR DO-NOT-TRACK FEATURES
            {'\n\n'}
            12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            {'\n\n'}
            13. DO WE MAKE UPDATES TO THIS NOTICE?
            {'\n\n'}
            14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            {'\n\n'}
            15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
            {'\n\n'}
            {'\n\n'}
            <Text style={styles.boldSection}>
              1. WHAT INFORMATION DO WE COLLECT?
            </Text>
            {'\n\n'}
            Personal information you disclose to us
            {'\n\n'}
            In Short: We collect personal information that you provide to us.
            {'\n\n'}
            We collect personal information that you voluntarily provide to us
            when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Services, or otherwise when you
            contact us.
            {'\n\n'}
            Personal Information Provided by You. The personal information that
            we collect depends on the context of your interactions with us and
            the Services, the choices you make, and the products and features
            you use. The personal information we collect may include the
            following:
            {'\n\n'}- names
            {'\n\n'}- phone numbers
            {'\n\n'}- email addresses
            {'\n\n'}- usernames
            {'\n\n'}- billing addresses
            {'\n\n'}
            Sensitive Information. We do not process sensitive information.
            {'\n\n'}
            Payment Data. We may collect data necessary to process your payment
            if you make purchases, such as your payment instrument number, and
            the security code associated with your payment instrument. All
            payment data is stored by __________
            {'\n\n'}
            You may find their privacy notice link(s) here: __________
            {'\n\n'}
            Social Media Login Data. We may provide you with the option to
            register with us using your existing social media account details,
            like your Facebook, Twitter, or other social media account. If you
            choose to register in this way, we will collect the information
            described in the section called 'HOW DO WE HANDLE YOUR SOCIAL
            LOGINS?' below.
            {'\n\n'}
            Application Data. If you use our application(s), we also may collect
            the following information if you choose to provide us with access or
            permission:
            {'\n\n'}
            Mobile Device Access. We may request access or permission to certain
            features from your mobile device, including your mobile device's
            calendar, reminders, and other features. If you wish to change our
            access or permissions, you may do so in your device's settings.
            {'\n\n'}
            Push Notifications. We may request to send you push notifications
            regarding your account or certain features of the application(s). If
            you wish to opt out from receiving these types of communications,
            you may turn them off in your device's settings.
            {'\n\n'}
            This information is primarily needed to maintain the security and
            operation of our application(s), for troubleshooting, and for our
            internal analytics and reporting purposes.
            {'\n\n'}
            All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
            {'\n\n'}
            Information automatically collected
            {'\n\n'}
            In Short: Some information — such as your Internet Protocol (IP)
            address and/or browser and device characteristics — is collected
            automatically when you visit our Services.
            {'\n\n'}
            We automatically collect certain information when you visit, use, or
            navigate the Services. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about how and when you use our Services, and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Services, and for our
            internal analytics and reporting purposes.
            {'\n\n'}
            Like many businesses, we also collect information through cookies
            and similar technologies.
            {'\n\n'}
            The information we collect includes:
            {'\n\n'}
            Log and Usage Data. Log and usage data is service-related,
            diagnostic, usage, and performance information our servers
            automatically collect when you access or use our Services and which
            we record in log files. Depending on how you interact with us, this
            log data may include your IP address, device information, browser
            type, and settings and information about your activity in the
            Services (such as the date/time stamps associated with your usage,
            pages and files viewed, searches, and other actions you take such as
            which features you use), device event information (such as system
            activity, error reports (sometimes called 'crash dumps'), and
            hardware settings).
            {'\n\n'}
            Device Data. We collect device data such as information about your
            computer, phone, tablet, or other device you use to access the
            Services. Depending on the device used, this device data may include
            information such as your IP address (or proxy server), device and
            application identification numbers, location, browser type, hardware
            model, Internet service provider and/or mobile carrier, operating
            system, and system configuration information.
            {'\n\n'}
            Location Data. We collect location data such as information about
            your device's location, which can be either precise or imprecise.
            How much information we collect depends on the type and settings of
            the device you use to access the Services. For example, we may use
            GPS and other technologies to collect geolocation data that tells us
            your current location (based on your IP address). You can opt out of
            allowing us to collect this information either by refusing access to
            the information or by disabling your Location setting on your
            device. However, if you choose to opt out, you may not be able to
            use certain aspects of the Services.
            {'\n\n'}
            <Text style={styles.boldSection}>
              2. HOW DO WE PROCESS YOUR INFORMATION?
            </Text>
            {'\n\n'}
            In Short: We process your information to provide, improve, and
            administer our Services, communicate with you, for security and
            fraud prevention, and to comply with law. We may also process your
            information for other purposes with your consent.
            {'\n\n'}
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
            {'\n\n'}- To facilitate account creation and authentication and
            otherwise manage user accounts. We may process your information so
            you can create and log in to your account, as well as keep your
            account in working order.
            {'\n\n'}- To deliver and facilitate delivery of services to the
            user. We may process your information to provide you with the
            requested service.
            {'\n\n'}- To send administrative information to you. We may process
            your information to send you details about our products and
            services, changes to our terms and policies, and other similar
            information.
            {'\n\n'}- To fulfil and manage your orders. We may process your
            information to fulfil and manage your orders, payments, returns, and
            exchanges made through the Services.
            {'\n\n'}- To save or protect an individual's vital interest. We may
            process your information when necessary to save or protect an
            individual’s vital interest, such as to prevent harm.
            {'\n\n'}
            <Text style={styles.boldSection}>
              3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
            </Text>
            {'\n\n'}
            In Short: We only process your personal information when we believe
            it is necessary and we have a valid legal reason (i.e. legal basis)
            to do so under applicable law, like with your consent, to comply
            with laws, to provide you with services to enter into or fulfil our
            contractual obligations, to protect your rights, or to fulfil our
            legitimate business interests.
            {'\n\n'}
            If you are located in the EU or UK, this section applies to you.
            {'\n\n'}
            The General Data Protection Regulation (GDPR) and UK GDPR require us
            to explain the valid legal bases we rely on in order to process your
            personal information. As such, we may rely on the following legal
            bases to process your personal information:
            {'\n\n'}- Consent. We may process your information if you have given
            us permission (i.e. consent) to use your personal information for a
            specific purpose. You can withdraw your consent at any time. Learn
            more about withdrawing your consent.
            {'\n\n'}- Performance of a Contract. We may process your personal
            information when we believe it is necessary to fulfil our
            contractual obligations to you, including providing our Services or
            at your request prior to entering into a contract with you.
            {'\n\n'}- Legal Obligations. We may process your information where
            we believe it is necessary for compliance with our legal
            obligations, such as to cooperate with a law enforcement body or
            regulatory agency, exercise or defend our legal rights, or disclose
            your information as evidence in litigation in which we are involved.
            {'\n\n'}- Vital Interests. We may process your information where we
            believe it is necessary to protect your vital interests or the vital
            interests of a third party, such as situations involving potential
            threats to the safety of any person.
            {'\n\n'}
            In legal terms, we are generally the 'data controller' under
            European data protection laws of the personal information described
            in this privacy notice, since we determine the means and/or purposes
            of the data processing we perform. This privacy notice does not
            apply to the personal information we process as a 'data processor'
            on behalf of our customers. In those situations, the customer that
            we provide services to and with whom we have entered into a data
            processing agreement is the 'data controller' responsible for your
            personal information, and we merely process your information on
            their behalf in accordance with your instructions. If you want to
            know more about our customers' privacy practices, you should read
            their privacy policies and direct any questions you have to them.
            {'\n\n'}
            If you are located in Canada, this section applies to you.
            {'\n\n'}
            We may process your information if you have given us specific
            permission (i.e. express consent) to use your personal information
            for a specific purpose, or in situations where your permission can
            be inferred (i.e. implied consent). You can withdraw your consent at
            any time.
            {'\n\n'}
            In some exceptional cases, we may be legally permitted under
            applicable law to process your information without your consent,
            including, for example:
            {'\n\n'}- If collection is clearly in the interests of an individual
            and consent cannot be obtained in a timely way
            {'\n\n'}- For investigations and fraud detection and prevention
            {'\n\n'}- For business transactions provided certain conditions are
            met
            {'\n\n'}- If it is contained in a witness statement and the
            collection is necessary to assess, process, or settle an insurance
            claim
            {'\n\n'}- For identifying injured, ill, or deceased persons and
            communicating with next of kin
            {'\n\n'}- If we have reasonable grounds to believe an individual has
            been, is, or may be victim of financial abuse
            {'\n\n'}- If it is reasonable to expect collection and use with
            consent would compromise the availability or the accuracy of the
            information and the collection is reasonable for purposes related to
            investigating a breach of an agreement or a contravention of the
            laws of Canada or a province
            {'\n\n'}- If disclosure is required to comply with a subpoena,
            warrant, court order, or rules of the court relating to the
            production of records
            {'\n\n'}- If it was produced by an individual in the course of their
            employment, business, or profession and the collection is consistent
            with the purposes for which the information was produced
            {'\n\n'}- If the collection is solely for journalistic, artistic, or
            literary purposes
            {'\n\n'}- If the information is publicly available and is specified
            by the regulations
            {'\n\n'}
            <Text style={styles.boldSection}>
              4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </Text>
            {'\n\n'}
            In Short: We may share information in specific situations described
            in this section and/or with the following third parties.
            {'\n\n'}
            We may need to share your personal information in the following
            situations:
            {'\n\n'}- Business Transfers. We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
            {'\n\n'}- Offer Wall. Our application(s) may display a third-party
            hosted 'offer wall'. Such an offer wall allows third-party
            advertisers to offer virtual currency, gifts, or other items to
            users in return for the acceptance and completion of an
            advertisement offer. Such an offer wall may appear in our
            application(s) and be displayed to you based on certain data, such
            as your geographic area or demographic information. When you click
            on an offer wall, you will be brought to an external website
            belonging to other persons and will leave our application(s). A
            unique identifier, such as your user ID, will be shared with the
            offer wall provider in order to prevent fraud and properly credit
            your account with the relevant reward.
            {'\n\n'}
            <Text style={styles.boldSection}>
              5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </Text>
            {'\n\n'}
            In Short: We may use cookies and other tracking technologies to
            collect and store your information.
            {'\n\n'}
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Notice.
            {'\n\n'}
            <Text style={styles.boldSection}>
              6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </Text>
            {'\n\n'}
            In Short: If you choose to register or log in to our Services using
            a social media account, we may have access to certain information
            about you.
            {'\n\n'}
            Our Services offer you the ability to register and log in using your
            third-party social media account details (like your Facebook or
            Twitter logins). Where you choose to do this, we will receive
            certain profile information about you from your social media
            provider. The profile information we receive may vary depending on
            the social media provider concerned, but will often include your
            name, email address, friends list, and profile picture, as well as
            other information you choose to make public on such a social media
            platform.
            {'\n\n'}
            We will use the information we receive only for the purposes that
            are described in this privacy notice or that are otherwise made
            clear to you on the relevant Services. Please note that we do not
            control, and are not responsible for, other uses of your personal
            information by your third-party social media provider. We recommend
            that you review their privacy notice to understand how they collect,
            use, and share your personal information, and how you can set your
            privacy preferences on their sites and apps.
            {'\n\n'}
            <Text style={styles.boldSection}>
              7. HOW LONG DO WE KEEP YOUR INFORMATION?
            </Text>
            {'\n\n'}
            In Short: We keep your information for as long as necessary to
            fulfil the purposes outlined in this privacy notice unless otherwise
            required by law.
            {'\n\n'}
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
            {'\n\n'}
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymise such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
            {'\n\n'}
            <Text style={styles.boldSection}>
              8. HOW DO WE KEEP YOUR INFORMATION SAFE?
            </Text>
            {'\n\n'}
            In Short: We aim to protect your personal information through a
            system of organisational and technical security measures.
            {'\n\n'}
            We have implemented appropriate and reasonable technical and
            organisational security measures designed to protect the security of
            any personal information we process. However, despite our safeguards
            and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be
            guaranteed to be 100% secure, so we cannot promise or guarantee that
            hackers, cybercriminals, or other unauthorised third parties will
            not be able to defeat our security and improperly collect, access,
            steal, or modify your information. Although we will do our best to
            protect your personal information, transmission of personal
            information to and from our Services is at your own risk. You should
            only access the Services within a secure environment.
            {'\n\n'}
            <Text style={styles.boldSection}>
              9. DO WE COLLECT INFORMATION FROM MINORS?
            </Text>
            {'\n\n'}
            In Short: We do not knowingly collect data from or market to
            children under 18 years of age.
            {'\n\n'}
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Services, you represent that you are at
            least 18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent’s use of the Services. If we learn
            that personal information from users less than 18 years of age has
            been collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we may have collected from children under
            age 18, please contact us at _________.
            {'\n\n'}
            <Text style={styles.boldSection}>
              10. WHAT ARE YOUR PRIVACY RIGHTS?
            </Text>
            {'\n\n'}
            In Short: In some regions, such as the European Economic Area (EEA),
            United Kingdom (UK), Switzerland, and Canada, you have rights that
            allow you greater access to and control over your personal
            information. You may review, change, or terminate your account at
            any time.
            {'\n\n'}
            In some regions (like the EEA, UK, Switzerland, and Canada), you
            have certain rights under applicable data protection laws. These may
            include the right (i) to request access and obtain a copy of your
            personal information, (ii) to request rectification or erasure;
            (iii) to restrict the processing of your personal information; (iv)
            if applicable, to data portability; and (v) not to be subject to
            automated decision-making. In certain circumstances, you may also
            have the right to object to the processing of your personal
            information. You can make such a request by contacting us by using
            the contact details provided in the section 'HOW CAN YOU CONTACT US
            ABOUT THIS NOTICE?' below.
            {'\n\n'}
            We will consider and act upon any request in accordance with
            applicable data protection laws.
            {'\n\n'}
            If you are located in the EEA or UK and you believe we are
            unlawfully processing your personal information, you also have the
            right to complain to your Member State data protection authority or
            UK data protection authority.
            {'\n\n'}
            If you are located in Switzerland, you may contact the Federal Data
            Protection and Information Commissioner.
            {'\n\n'}
            Withdrawing your consent: If we are relying on your consent to
            process your personal information, which may be express and/or
            implied consent depending on the applicable law, you have the right
            to withdraw your consent at any time. You can withdraw your consent
            at any time by contacting us by using the contact details provided
            in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below or
            updating your preferences.
            {'\n\n'}
            However, please note that this will not affect the lawfulness of the
            processing before its withdrawal nor, when applicable law allows,
            will it affect the processing of your personal information conducted
            in reliance on lawful processing grounds other than consent.
            {'\n\n'}
            Opting out of marketing and promotional communications: You can
            unsubscribe from our marketing and promotional communications at any
            time by clicking on the unsubscribe link in the emails that we send,
            or by contacting us using the details provided in the section 'HOW
            CAN YOU CONTACT US ABOUT THIS NOTICE?' below. You will then be
            removed from the marketing lists. However, we may still communicate
            with you — for example, to send you service-related messages that
            are necessary for the administration and use of your account, to
            respond to service requests, or for other non-marketing purposes.
            {'\n\n'}
            Account Information
            {'\n\n'}
            If you would at any time like to review or change the information in
            your account or terminate your account, you can:
            {'\n\n'}- Log in to your account settings and update your user
            account.
            {'\n\n'}
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal
            requirements.
            {'\n\n'}
            Cookies and similar technologies: Most Web browsers are set to
            accept cookies by default. If you prefer, you can usually choose to
            set your browser to remove cookies and to reject cookies. If you
            choose to remove cookies or reject cookies, this could affect
            certain features or services of our Services.
            {'\n\n'}
            If you have questions or comments about your privacy rights, you may
            email us at a.anand@novatidelabs.com.
            {'\n\n'}
            <Text style={styles.boldSection}>
              11. CONTROLS FOR DO-NOT-TRACK FEATURES
            </Text>
            {'\n\n'}
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track ('DNT') feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. At
            this stage no uniform technology standard for recognising and
            implementing DNT signals has been finalised. As such, we do not
            currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If
            a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version
            of this privacy notice.
            {'\n\n'}
            <Text style={styles.boldSection}>
              12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </Text>
            {'\n\n'}
            In Short: If you are a resident of , you are granted specific rights
            regarding access to your personal information.
            {'\n\n'}
            What categories of personal information do we collect?
            {'\n\n'}
            We have collected the following categories of personal information
            in the past twelve (12) months:
          </Text>
          <Image
            source={require('../../../../assets/images/account/termlyGrid.png')}
            style={styles.gridStyle}
          />
          <Text style={styles.privacyPolicyText}>
            {'\n\n'}
            We may also collect other personal information outside of these
            categories through instances where you interact with us in person,
            online, or by phone or mail in the context of:
            {'\n\n'}- Receiving help through our customer support channels;
            {'\n\n'}- Participation in customer surveys or contests; and
            {'\n\n'}- Facilitation in the delivery of our Services and to
            respond to your inquiries.
            {'\n\n'}
            How do we use and share your personal information?
            {'\n\n'}
            Learn about how we use your personal information in the section,
            'HOW DO WE PROCESS YOUR INFORMATION?'
            {'\n\n'}
            Will your information be shared with anyone else?
            {'\n\n'}
            We may disclose your personal information with our service providers
            pursuant to a written contract between us and each service provider.
            Learn more about how we disclose personal information to in the
            section, 'WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?'
            {'\n\n'}
            We may use your personal information for our own business purposes,
            such as for undertaking internal research for technological
            development and demonstration. This is not considered to be
            'selling' of your personal information.
            {'\n\n'}
            We have not disclosed, sold, or shared any personal information to
            third parties for a business or commercial purpose in the preceding
            twelve (12) months. We will not sell or share personal information
            in the future belonging to website visitors, users, and other
            consumers.
            {'\n\n'}
            <Text style={styles.boldSection}>
              13. DO WE MAKE UPDATES TO THIS NOTICE?
            </Text>
            {'\n\n'}
            In Short: Yes, we will update this notice as necessary to stay
            compliant with relevant laws.
            {'\n\n'}
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated 'Revised' date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy notice, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
            {'\n\n'}
            <Text style={styles.boldSection}>
              14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </Text>
            {'\n\n'}
            If you have questions or comments about this notice, you may contact
            us by post at:
            {'\n\n'}
            Novatide Limited 71-75 Shelton Street London WC2H 9JQ United Kingdom
            {'\n\n'}
            If you are a resident in the United Kingdom, we are the 'data
            controller' of your personal information. We have appointed Aman
            Anand to be our representative in the UK. You can contact them
            directly regarding our processing of your information, by email at
            a.anand@novatidelabs.com, by visiting aialpha.ai, by phone at
            07986290516, or by post to:
            {'\n\n'}
            __________
            {'\n\n'}
            __________
            {'\n\n'}
            __________
            {'\n\n'}
            United Kingdom
            {'\n\n'}
            <Text style={styles.boldSection}>
              15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </Text>
            {'\n\n'}
            You have the right to request access to the personal information we
            collect from you, change that information, or delete it. To request
            to review, update, or delete your personal information, please fill
            out and submit a data subject access request.
            {'\n\n'}
            {'\n\n'}
            {'\n\n'}
            {'\n\n'}
            {'\n\n'}
            {'\n\n'}
            {'\n\n'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
