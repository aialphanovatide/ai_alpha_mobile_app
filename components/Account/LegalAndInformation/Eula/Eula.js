import React, {useContext} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import useEulaStyles from './EulaStyles';
import BackButton from '../../../Analysis/BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundGradient from '../../../BackgroundGradient/BackgroundGradient';

const Eula = () => {
  const styles = useEulaStyles();
  return (
    <SafeAreaView style={[styles.mainView, styles.paddingV]}>
      <BackgroundGradient />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}>
        <BackButton />
        <Text style={styles.title}>END USER LICENCE AGREEMENT</Text>
        <View style={styles.container}>
          <Text style={styles.privacyPolicyText}>
            {'\n\n'}
            Last updated January 16, 2024
            {'\n\n'}
            AI Alpha is licensed to You (End-User) by Novatide Limited, located
            and registered at 71-75 Shelton Street, Covent Garden, London,
            London WC2H 9JQ, England ('Licensor'), for use only under the terms
            of this Licence Agreement.
            {'\n\n'}
            By downloading the Licensed Application from Apple's software
            distribution platform ('App Store'), and any update thereto (as
            permitted by this Licence Agreement), You indicate that You agree to
            be bound by all of the terms and conditions of this Licence
            Agreement, and that You accept this Licence Agreement. App Store is
            referred to in this Licence Agreement as 'Services'.
            {'\n\n'}
            The parties of this Licence Agreement acknowledge that the Services
            are not a Party to this Licence Agreement and are not bound by any
            provisions or obligations with regard to the Licensed Application,
            such as warranty, liability, maintenance and support thereof.
            Novatide Limited, not the Services, is solely responsible for the
            Licensed Application and the content thereof.
            {'\n\n'}
            This Licence Agreement may not provide for usage rules for the
            Licensed Application that are in conflict with the latest Apple
            Media Services Terms and Conditions ('Usage Rules'). Novatide
            Limited acknowledges that it had the opportunity to review the Usage
            Rules and this Licence Agreement is not conflicting with them.
            {'\n\n'}
            AI Alpha when purchased or downloaded through the Services, is
            licensed to You for use only under the terms of this Licence
            Agreement. The Licensor reserves all rights not expressly granted to
            You. AI Alpha is to be used on devices that operate with Apple's
            operating systems ('iOS' and 'Mac OS').
            {'\n\n'}
            {'\n\n'}
            <Text style={styles.boldSection}>TABLE OF CONTENTS</Text>
            {'\n\n'}
            {'\n\n'}
            1. THE APPLICATION
            {'\n\n'}
            2. SCOPE OF LICENCE
            {'\n\n'}
            3. TECHNICAL REQUIREMENTS
            {'\n\n'}
            4. NO MAINTENANCE AND SUPPORT
            {'\n\n'}
            5. USE OF DATA
            {'\n\n'}
            6. USER-GENERATED CONTRIBUTIONS
            {'\n\n'}
            7. CONTRIBUTION LICENCE
            {'\n\n'}
            8. LIABILITY
            {'\n\n'}
            9. WARRANTY
            {'\n\n'}
            10. PRODUCT CLAIMS
            {'\n\n'}
            11. LEGAL COMPLIANCE
            {'\n\n'}
            12. CONTACT INFORMATION
            {'\n\n'}
            13. TERMINATION
            {'\n\n'}
            14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY
            {'\n\n'}
            15. INTELLECTUAL PROPERTY RIGHTS
            {'\n\n'}
            16. APPLICABLE LAW
            {'\n\n'}
            17. MISCELLANEOUS
            {'\n\n'}
            {'\n\n'}
            <Text style={styles.boldSection}>1. THE APPLICATION</Text>
            {'\n\n'}
            AI Alpha ('Licensed Application') is a piece of software created to
            educating our users with our first of its kind AI crypto educational
            assistant on the digital finance markets — and customised for iOS
            mobile devices ('Devices'). It is used to Allow users access to key
            information to help enhance their understanding of digital finance
            markets.
            {'\n\n'}
            The Licensed Application is not tailored to comply with
            industry-specific regulations (Health Insurance Portability and
            Accountability Act (HIPAA), Federal Information Security Management
            Act (FISMA), etc.), so if your interactions would be subjected to
            such laws, you may not use this Licensed Application. You may not
            use the Licensed Application in a way that would violate the
            Gramm-Leach-Bliley Act (GLBA).
            {'\n\n'}
            <Text style={styles.boldSection}>2. SCOPE OF LICENCE</Text>
            {'\n\n'}
            2.1 You are given a non-transferable, non-exclusive,
            non-sublicensable licence to install and use the Licensed
            Application on any Devices that You (End-User) own or control and as
            permitted by the Usage Rules, with the exception that such Licensed
            Application may be accessed and used by other accounts associated
            with You (End- User, The Purchaser) via Family Sharing or volume
            purchasing.
            {'\n\n'}
            2.2 This licence will also govern any updates of the Licensed
            Application provided by Licensor that replace, repair, and/or
            supplement the first Licensed Application, unless a separate licence
            is provided for such update, in which case the terms of that new
            licence will govern.
            {'\n\n'}
            2.3 You may not share or make the Licensed Application available to
            third parties (unless to the degree allowed by the Usage Rules, and
            with Novatide Limited's prior written consent), sell, rent, lend,
            lease or otherwise redistribute the Licensed Application.
            {'\n\n'}
            2.4 You may not reverse engineer, translate, disassemble, integrate,
            decompile, remove, modify, combine, create derivative works or
            updates of, adapt, or attempt to derive the source code of the
            Licensed Application, or any part thereof (except with Novatide
            Limited's prior written consent).
            {'\n\n'}
            2.5 You may not copy (excluding when expressly authorised by this
            licence and the Usage Rules) or alter the Licensed Application or
            portions thereof. You may create and store copies only on devices
            that You own or control for backup keeping under the terms of this
            licence, the Usage Rules, and any other terms and conditions that
            apply to the device or software used. You may not remove any
            intellectual property notices. You acknowledge that no unauthorised
            third parties may gain access to these copies at any time. If you
            sell your Devices to a third party, you must remove the Licensed
            Application from the Devices before doing so.
            {'\n\n'}
            2.6 Violations of the obligations mentioned above, as well as the
            attempt of such infringement, may be subject to prosecution and
            damages.
            {'\n\n'}
            2.7 Licensor reserves the right to modify the terms and conditions
            of licensing.
            {'\n\n'}
            2.8 Nothing in this licence should be interpreted to restrict
            third-party terms. When using the Licensed Application, You must
            ensure that You comply with applicable third-party terms and
            conditions.
            {'\n\n'}
            <Text style={styles.boldSection}>3. TECHNICAL REQUIREMENTS</Text>
            {'\n\n'}
            3.1 The Licensed Application requires a firmware version 1.0.0 or
            higher. Licensor recommends using the latest version of the
            firmware.
            {'\n\n'}
            3.2 Licensor attempts to keep the Licensed Application updated so
            that it complies with modified/new versions of the firmware and new
            hardware. You are not granted rights to claim such an update.
            {'\n\n'}
            3.3 You acknowledge that it is Your responsibility to confirm and
            determine that the app end-user device on which You intend to use
            the Licensed Application satisfies the technical specifications
            mentioned above.
            {'\n\n'}
            3.4 Licensor reserves the right to modify the technical
            specifications as it sees appropriate at any time.
            {'\n\n'}
            <Text style={styles.boldSection}>4. NO MAINTENANCE OR SUPPORT</Text>
            {'\n\n'}
            4.1 Novatide Limited is not obligated, expressed or implied, to
            provide any maintenance, technical or other support for the Licensed
            Application.
            {'\n\n'}
            4.2 Novatide Limited and the End-User acknowledge that the Services
            have no obligation whatsoever to furnish any maintenance and support
            services with respect to the Licensed Application.
            {'\n\n'}
            <Text style={styles.boldSection}>5. USE OF DATA</Text>
            {'\n\n'}
            You acknowledge that Licensor will be able to access and adjust Your
            downloaded Licensed Application content and Your personal
            information, and that Licensor's use of such material and
            information is subject to Your legal agreements with Licensor and
            Licensor's privacy policy, which can be accessed by Clicking on the
            Account icon, and then clicking the ‘Privacy Policy'.
            {'\n\n'}
            You acknowledge that the Licensor may periodically collect and use
            technical data and related information about your device, system,
            and application software, and peripherals, offer product support,
            facilitate the software updates, and for purposes of providing other
            services to you (if any) related to the Licensed Application.
            Licensor may also use this information to improve its products or to
            provide services or technologies to you, as long as it is in a form
            that does not personally identify you.
            {'\n\n'}
            <Text style={styles.boldSection}>
              6. USER-GENERATED CONTRIBUTIONS
            </Text>
            {'\n\n'}
            The Licensed Application does not offer users to submit or post
            content. We may provide you with the opportunity to create, submit,
            post, display, transmit, perform, publish, distribute, or broadcast
            content and materials to us or in the Licensed Application,
            including but not limited to text, writings, video, audio,
            photographs, graphics, comments, suggestions, or personal
            information or other material (collectively, 'Contributions').
            Contributions may be viewable by other users of the Licensed
            Application and through third-party websites or applications. As
            such, any Contributions you transmit may be treated in accordance
            with the Licensed Application Privacy Policy. When you create or
            make available any Contributions, you thereby represent and warrant
            that:
            {'\n\n'}
            1. The creation, distribution, transmission, public display, or
            performance, and the accessing, downloading, or copying of your
            Contributions do not and will not infringe the proprietary rights,
            including but not limited to the copyright, patent, trademark, trade
            secret, or moral rights of any third party.
            {'\n\n'}
            2. You are the creator and owner of or have the necessary licences,
            rights, consents, releases, and permissions to use and to authorise
            us, the Licensed Application, and other users of the Licensed
            Application to use your Contributions in any manner contemplated by
            the Licensed Application and this Licence Agreement.
            {'\n\n'}
            3. You have the written consent, release, and/or permission of each
            and every identifiable individual person in your Contributions to
            use the name or likeness or each and every such identifiable
            individual person to enable inclusion and use of your Contributions
            in any manner contemplated by the Licensed Application and this
            Licence Agreement.
            {'\n\n'}
            4. Your Contributions are not false, inaccurate, or misleading.
            {'\n\n'}
            5. Your Contributions are not unsolicited or unauthorised
            advertising, promotional materials, pyramid schemes, chain letters,
            spam, mass mailings, or other forms of solicitation.
            {'\n\n'}
            6. Your Contributions are not obscene, lewd, lascivious, filthy,
            violent, harassing, libellous, slanderous, or otherwise
            objectionable (as determined by us).
            {'\n\n'}
            7. Your Contributions do not ridicule, mock, disparage, intimidate,
            or abuse anyone.
            {'\n\n'}
            8. Your Contributions are not used to harass or threaten (in the
            legal sense of those terms) any other person and to promote violence
            against a specific person or class of people.
            {'\n\n'}
            9. Your Contributions do not violate any applicable law, regulation,
            or rule.
            {'\n\n'}
            10. Your Contributions do not violate the privacy or publicity
            rights of any third party.
            {'\n\n'}
            11. Your Contributions do not violate any applicable law concerning
            child pornography, or otherwise intended to protect the health or
            well-being of minors.
            {'\n\n'}
            12. Your Contributions do not include any offensive comments that
            are connected to race, national origin, gender, sexual preference,
            or physical handicap.
            {'\n\n'}
            13. Your Contributions do not otherwise violate, or link to material
            that violates, any provision of this Licence Agreement, or any
            applicable law or regulation.
            {'\n\n'}
            Any use of the Licensed Application in violation of the foregoing
            violates this Licence Agreement and may result in, among other
            things, termination or suspension of your rights to use the Licensed
            Application.
            {'\n\n'}
            <Text style={styles.boldSection}>7. CONTRIBUTION LICENCE</Text>
            {'\n\n'}
            You agree that we may access, store, process, and use any
            information and personal data that you provide following the terms
            of the Privacy Policy and your choices (including settings).
            {'\n\n'}
            By submitting suggestions of other feedback regarding the Licensed
            Application, you agree that we can use and share such feedback for
            any purpose without compensation to you.
            {'\n\n'}
            We do not assert any ownership over your Contributions. You retain
            full ownership of all of your Contributions and any intellectual
            property rights or other proprietary rights associated with your
            Contributions. We are not liable for any statements or
            representations in your Contributions provided by you in any area in
            the Licensed Application. You are solely responsible for your
            Contributions to the Licensed Application and you expressly agree to
            exonerate us from any and all responsibility and to refrain from any
            legal action against us regarding your Contributions.
            {'\n\n'}
            <Text style={styles.boldSection}>8. LIABILITY</Text>
            {'\n\n'}
            8.1 Licensor takes no accountability or responsibility for any
            damages caused due to a breach of duties according to Section 2 of
            this Licence Agreement. To avoid data loss, You are required to make
            use of backup functions of the Licensed Application to the extent
            allowed by applicable third-party terms and conditions of use. You
            are aware that in case of alterations or manipulations of the
            Licensed Application, You will not have access to the Licensed
            Application.
            {'\n\n'}
            <Text style={styles.boldSection}>9. WARRANTY</Text>
            {'\n\n'}
            9.1 Licensor warrants that the Licensed Application is free of
            spyware, trojan horses, viruses, or any other malware at the time of
            Your download. Licensor warrants that the Licensed Application works
            as described in the user documentation.
            {'\n\n'}
            9.2 No warranty is provided for the Licensed Application that is not
            executable on the device, that has been unauthorisedly modified,
            handled inappropriately or culpably, combined or installed with
            inappropriate hardware or software, used with inappropriate
            accessories, regardless if by Yourself or by third parties, or if
            there are any other reasons outside of Novatide Limited's sphere of
            influence that affect the executability of the Licensed Application.
            {'\n\n'}
            9.3 You are required to inspect the Licensed Application immediately
            after installing it and notify Novatide Limited about issues
            discovered without delay by email provided in Contact Information.
            The defect report will be taken into consideration and further
            investigated if it has been emailed within a period of __________
            days after discovery.
            {'\n\n'}
            9.4 If we confirm that the Licensed Application is defective,
            Novatide Limited reserves a choice to remedy the situation either by
            means of solving the defect or substitute delivery.
            {'\n\n'}
            9.5 In the event of any failure of the Licensed Application to
            conform to any applicable warranty, You may notify the Services
            Store Operator, and Your Licensed Application purchase price will be
            refunded to You. To the maximum extent permitted by applicable law,
            the Services Store Operator will have no other warranty obligation
            whatsoever with respect to the Licensed Application, and any other
            losses, claims, damages, liabilities, expenses, and costs
            attributable to any negligence to adhere to any warranty.
            {'\n\n'}
            9.6 If the user is an entrepreneur, any claim based on faults
            expires after a statutory period of limitation amounting to twelve
            (12) months after the Licensed Application was made available to the
            user. The statutory periods of limitation given by law apply for
            users who are consumers.
            {'\n\n'}
            <Text style={styles.boldSection}>10. PRODUCT CLAIMS</Text>
            {'\n\n'}
            Novatide Limited and the End-User acknowledge that Novatide Limited,
            and not the Services, is responsible for addressing any claims of
            the End-User or any third party relating to the Licensed Application
            or the End-User’s possession and/or use of that Licensed
            Application, including, but not limited to:
            {'\n\n'}
            (i) product liability claims;
            {'\n\n'}
            (ii) any claim that the Licensed Application fails to conform to any
            applicable legal or regulatory requirement; and
            {'\n\n'}
            (iii) claims arising under consumer protection, privacy, or similar
            legislation, including in connection with Your Licensed
            Application’s use of the HealthKit and HomeKit.
            {'\n\n'}
            <Text style={styles.boldSection}>11. LEGAL COMPLIANCE</Text>
            {'\n\n'}
            You represent and warrant that You are not located in a country that
            is subject to a US Government embargo, or that has been designated
            by the US Government as a 'terrorist supporting' country; and that
            You are not listed on any US Government list of prohibited or
            restricted parties.
            {'\n\n'}
            <Text style={styles.boldSection}>12. CONTACT INFORMATION</Text>
            {'\n\n'}
            For general inquiries, complaints, questions or claims concerning
            the Licensed Application, please contact:
            {'\n\n'}
            __________{'\n\n'}
            __________{'\n\n'}
            __________, __________ __________{'\n\n'}
            __________{'\n\n'}
            __________{'\n\n'}
            {'\n\n'}
            <Text style={styles.boldSection}>13. TERMINATION</Text>
            {'\n\n'}
            The licence is valid until terminated by Novatide Limited or by You.
            Your rights under this licence will terminate automatically and
            without notice from Novatide Limited if You fail to adhere to any
            term(s) of this licence. Upon Licence termination, You shall stop
            all use of the Licensed Application, and destroy all copies, full or
            partial, of the Licensed Application.
            {'\n\n'}
            <Text style={styles.boldSection}>
              14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY
            </Text>
            {'\n\n'}
            Novatide Limited represents and warrants that Novatide Limited will
            comply with applicable third-party terms of agreement when using
            Licensed Application.
            {'\n\n'}
            In Accordance with Section 9 of the 'Instructions for Minimum Terms
            of Developer's End-User Licence Agreement', Apple's subsidiaries
            shall be third-party beneficiaries of this End User Licence
            Agreement and — upon Your acceptance of the terms and conditions of
            this Licence Agreement, Apple will have the right (and will be
            deemed to have accepted the right) to enforce this End User Licence
            Agreement against You as a third-party beneficiary thereof.
            {'\n\n'}
            <Text style={styles.boldSection}>
              15. INTELLECTUAL PROPERTY RIGHTS
            </Text>
            {'\n\n'}
            Novatide Limited and the End-User acknowledge that, in the event of
            any third-party claim that the Licensed Application or the
            End-User's possession and use of that Licensed Application infringes
            on the third party's intellectual property rights, Novatide Limited,
            and not the Services, will be solely responsible for the
            investigation, defence, settlement, and discharge or any such
            intellectual property infringement claims.
            {'\n\n'}
            <Text style={styles.boldSection}>16. APPLICABLE LAW</Text>
            {'\n\n'}
            This Licence Agreement is governed by the laws of England and Wales,
            English law, excluding its conflicts of law rules.
            {'\n\n'}
            <Text style={styles.boldSection}>17. MISCELLANEOUS</Text>
            {'\n\n'}
            17.1 If any of the terms of this agreement should be or become
            invalid, the validity of the remaining provisions shall not be
            affected. Invalid terms will be replaced by valid ones formulated in
            a way that will achieve the primary purpose.
            {'\n\n'}
            17.2 Collateral agreements, changes and amendments are only valid if
            laid down in writing. The preceding clause can only be waived in
            writing.
            {'\n\n'}
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

export default Eula;
