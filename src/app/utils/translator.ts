import { Translate } from '@google-cloud/translate/build/src/v2';

const CREDENTIALS = JSON.parse(process.env.TRANSLATOR_CREDENTIALS || '');

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

export default {
  async detectLanguage(text: string): Promise<string> {
    try {
      const [detectedLanguage] = await translate.detect(text);

      return detectedLanguage.language;
    } catch (error) {
      console.log(`Error detecting language: ${error}`);
      return 'pt';
    }
  },

  async translateCard(card: any, targetLanguage: string) {
    try {
      const textsToTranslate = [
        card.title,
        card.description,
        card.question,
        card.solutionText,
      ];

      const isDefaultCardLanguage =
        (await this.detectLanguage(card.description)) === targetLanguage;

      if (!isDefaultCardLanguage) {
        const [
          [
            translatedTitle,
            translatedDescription,
            translatedQuestion,
            translatedSolutionText,
          ],
        ] = await translate.translate(textsToTranslate, targetLanguage);

        card.title = translatedTitle;
        card.description = translatedDescription;
        card.question = translatedQuestion;
        card.solutionText = translatedSolutionText;
      }
    } catch (error) {
      console.log(`Error translating text: ${error}`);
    }
  },
};
