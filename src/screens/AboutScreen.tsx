import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/layout/Screen';
import { ScreenHeader } from '../components/layout/ScreenHeader';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { MainTabParamList } from '../navigation/types';

type AboutScreenProps = BottomTabScreenProps<MainTabParamList, 'About'>;

export function AboutScreen(_props: AboutScreenProps) {
  return (
    <Screen scroll contentContainerStyle={styles.content} edges={['top', 'left', 'right']}>
      <ScreenHeader title="LEZZET ANKARA NEDİR?" />

      <View style={styles.aboutCard}>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Lezzet Ankara, Ankara’daki öne çıkan restoranları kategoriler halinde
          keşfetmenizi sağlayan özenle seçilmiş bir restoran rehberidir.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Binlerce restoran arasında kaybolmak yerine, farklı mutfaklar ve lezzet
          kategorilerindeki en iyi mekânlara hızlıca ulaşmanızı sağlar.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Restoranlar, Google Haritalar’daki puan ve yorum sayılarını akıllıca
          birleştiren bir sistemle sıralanıyor. Böylece hem yeni yükselen kaliteli
          mekânlar hem de yıllardır sevilen klasikler dengeli şekilde öne çıkıyor.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Her restoran detay sayfasında semt, çalışma saatleri, puan, yorum sayısı
          ve öne çıkan lezzetler gibi tüm kritik bilgiler tek bakışta yer alır.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Uygulama içinde restoran arayabilir, kategorilere göz atabilir, semtlere
          göre filtreleyebilir ve sadece şu anda açık olan işletmeleri
          görüntüleyebilirsiniz.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Beğendiğiniz restoranları favorilerinize ekleyip kendi listenizi
          oluşturabilir, tek dokunuşla arkadaşlarınızla paylaşabilirsiniz.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Keşif deneyimi tamamen uygulama içinde gerçekleşir. Harita bağlantısı
          yalnızca seçilen restorana ulaşımı kolaylaştırmak için sunulan yardımcı
          bir özelliktir.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutParagraph}>
          Uygulama tamamen çevrimdışı çalışır ve herhangi bir hesap oluşturmadan
          hemen kullanılabilir.
        </Text>

        <Pressable
          accessibilityRole="link"
          onPress={() =>
            void Linking.openURL('https://talatekrem.github.io/lezzet-ankara/')
          }
          style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
        >
          <Text allowFontScaling={false} style={styles.linkText}>
            Destek ve gizlilik
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  aboutCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  aboutParagraph: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  linkButton: {
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
  },
  linkText: {
    ...TYPOGRAPHY.meta,
    color: COLORS.accentGoldStart,
    fontFamily: TYPOGRAPHY.categoryLabel.fontFamily,
    fontSize: 13,
    letterSpacing: 0.6,
  },
  pressed: {
    opacity: 0.82,
  },
});
